import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, ShieldAlert, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import Loading from "../../components/common/Loading";
import useTable from "../../hooks/useTable";
import { staffApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Staff() {
  const [rawStaff, setRawStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("view"); // "view" | "add" | "edit" | "toggleStatus" | "delete"
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const { isAdmin } = useAuth();

  // Form states for Add / Edit
  const [addForm, setAddForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "receptionist",
    department: "reception",
    position: "",
    phone: "",
    employeeId: "",
  });

  const [editForm, setEditForm] = useState({
    position: "",
    department: "",
    phone: "",
    status: "active",
    role: "receptionist",
  });

  const fetchStaff = async () => {
    setLoading(true);
    setApiError("");
    try {
      const data = await staffApi.getAll();
      if (data && data.success && Array.isArray(data.staff)) {
        setRawStaff(data.staff);
      } else {
        setRawStaff([]);
      }
    } catch (err) {
      setApiError(err.message || "Failed to load staff profiles from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const formattedStaff = useMemo(() => {
    return rawStaff.map((sp) => {
      const roleStr = sp.user?.role?.name || (typeof sp.user?.role === "string" ? sp.user.role : "receptionist");
      const deptStr = sp.department || "reception";
      const statusStr = sp.user?.status || "active";
      const fullName = `${sp.user?.firstName || ""} ${sp.user?.lastName || ""}`.trim() || "Staff Member";

      return {
        id: sp._id,
        employeeId: sp.employeeId || "—",
        name: fullName,
        firstName: sp.user?.firstName || "",
        lastName: sp.user?.lastName || "",
        role: roleStr.charAt(0).toUpperCase() + roleStr.slice(1),
        roleRaw: roleStr,
        email: sp.user?.email || "—",
        phone: sp.user?.phone || "—",
        department: deptStr.charAt(0).toUpperCase() + deptStr.slice(1),
        departmentRaw: deptStr,
        position: sp.position || "—",
        status: statusStr.charAt(0).toUpperCase() + statusStr.slice(1),
        statusRaw: statusStr,
        joined: sp.joiningDate
          ? new Date(sp.joiningDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
        raw: sp,
      };
    });
  }, [rawStaff]);

  const table = useTable(formattedStaff, {
    searchKeys: ["name", "role", "email", "department", "employeeId", "position"],
    pageSize: 8,
  });

  const openAddModal = () => {
    setAddForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "receptionist",
      department: "reception",
      position: "",
      phone: "",
      employeeId: "",
    });
    setFormError("");
    setMode("add");
    setSelected({});
  };

  const openEditModal = (row) => {
    setEditForm({
      position: row.position !== "—" ? row.position : "",
      department: row.departmentRaw,
      phone: row.phone !== "—" ? row.phone : "",
      status: row.statusRaw,
      role: row.roleRaw,
    });
    setFormError("");
    setMode("edit");
    setSelected(row);
  };

  const handleCreateStaff = async () => {
    if (
      !addForm.firstName.trim() ||
      !addForm.lastName.trim() ||
      !addForm.email.trim() ||
      !addForm.password
    ) {
      setFormError("First name, last name, email, and password are required.");
      return;
    }

    setModalSubmitting(true);
    setFormError("");

    try {
      await staffApi.create({
        firstName: addForm.firstName.trim(),
        lastName: addForm.lastName.trim(),
        email: addForm.email.trim(),
        password: addForm.password,
        role: addForm.role,
        department: addForm.department,
        position: addForm.position.trim() || undefined,
        phone: addForm.phone.trim() || undefined,
        employeeId: addForm.employeeId.trim() || undefined,
      });

      setSelected(null);
      await fetchStaff();
    } catch (err) {
      setFormError(err.message || "Failed to create staff account.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleUpdateStaff = async () => {
    if (!selected) return;

    setModalSubmitting(true);
    setFormError("");

    try {
      await staffApi.update(selected.id, {
        position: editForm.position.trim() || undefined,
        department: editForm.department,
        phone: editForm.phone.trim() || null,
        status: editForm.status,
        role: editForm.role,
      });

      setSelected(null);
      await fetchStaff();
    } catch (err) {
      setFormError(err.message || "Failed to update staff member.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!selected) return;

    setModalSubmitting(true);
    setFormError("");

    const newStatus = selected.statusRaw === "active" ? "inactive" : "active";

    try {
      await staffApi.update(selected.id, { status: newStatus });
      setSelected(null);
      await fetchStaff();
    } catch (err) {
      setFormError(err.message || "Failed to toggle status.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleDeleteStaff = async () => {
    if (!selected) return;

    setModalSubmitting(true);
    setFormError("");

    try {
      await staffApi.delete(selected.id);
      setSelected(null);
      await fetchStaff();
    } catch (err) {
      setFormError(err.message || "Failed to delete staff member.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleModalConfirm = () => {
    if (mode === "add") handleCreateStaff();
    else if (mode === "edit") handleUpdateStaff();
    else if (mode === "toggleStatus") handleToggleStatus();
    else if (mode === "delete") handleDeleteStaff();
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (r) => (
        <div>
          <span className="font-medium text-charcoal">{r.name}</span>
          <span className="block text-[11px] text-muted">{r.employeeId}</span>
        </div>
      ),
    },
    { key: "role", label: "Role", sortable: true },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "department", label: "Department" },
    {
      key: "status",
      label: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    { key: "joined", label: "Joined Date", sortable: true },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelected(r);
              setMode("view");
            }}
          >
            View
          </Button>

          {isAdmin && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditModal(r)}
              >
                Edit
              </Button>
              <Button
                variant={r.statusRaw === "active" ? "danger" : "outline"}
                size="sm"
                onClick={() => {
                  setSelected(r);
                  setMode("toggleStatus");
                }}
              >
                {r.statusRaw === "active" ? "Deactivate" : "Activate"}
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Staff Management"
        description="Team members, departmental assignments, and role access."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchStaff} disabled={loading}>
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
            </Button>
            {isAdmin ? (
              <Button onClick={openAddModal}>
                <Plus size={14} /> Add staff
              </Button>
            ) : (
              <span className="text-[12px] text-muted italic">
                (Staff creation is restricted to Admin)
              </span>
            )}
          </div>
        }
      />

      {apiError && (
        <div className="mb-5 flex items-center gap-2 border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-800">
          <ShieldAlert size={16} />
          <span>{apiError}</span>
        </div>
      )}

      <FilterBar className="mb-5">
        <SearchBar
          value={table.query}
          onChange={table.setQuery}
          placeholder="Search by name, role, email, employee ID..."
        />
        <Select
          label="Role"
          options={[
            "All",
            "Admin",
            "Manager",
            "Receptionist",
            "Housekeeping",
            "Maintenance",
          ]}
          value={table.filters.role || "All"}
          onChange={(e) => table.setFilter("role", e.target.value)}
        />
        <Select
          label="Status"
          options={["All", "Active", "Inactive", "Suspended"]}
          value={table.filters.status || "All"}
          onChange={(e) => table.setFilter("status", e.target.value)}
        />
      </FilterBar>

      {loading ? (
        <div className="border border-charcoal/8 bg-white p-12">
          <Loading message="Loading staff profiles from backend..." />
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={table.pageRows}
          sort={table.sort}
          onSort={table.toggleSort}
          page={table.page}
          pageCount={table.pageCount}
          total={table.total}
          onPage={table.setPage}
        />
      )}

      <AdminModal
        open={selected !== null}
        title={
          mode === "add"
            ? "Add New Staff Member"
            : mode === "edit"
            ? `Edit Staff: ${selected?.name}`
            : mode === "toggleStatus"
            ? `${selected?.statusRaw === "active" ? "Deactivate" : "Activate"} Staff Member`
            : mode === "delete"
            ? `Delete Staff Account`
            : selected?.name || "Staff Member"
        }
        onClose={() => setSelected(null)}
        onConfirm={mode !== "view" ? handleModalConfirm : undefined}
        confirmLabel={
          modalSubmitting
            ? "Processing..."
            : mode === "toggleStatus"
            ? selected?.statusRaw === "active"
              ? "Deactivate Account"
              : "Activate Account"
            : mode === "add"
            ? "Create Staff Account"
            : mode === "delete"
            ? "Confirm Delete"
            : "Save Changes"
        }
      >
        {formError && (
          <div className="mb-4 flex items-center gap-2 border border-rose-200 bg-rose-50 p-3 text-[12px] text-rose-800">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {mode === "view" && selected && (
          <div className="space-y-4 text-[13px]">
            <div className="grid grid-cols-2 gap-4 border-b border-charcoal/8 pb-3">
              <div>
                <dt className="text-muted">Employee ID</dt>
                <dd className="font-semibold text-charcoal">{selected.employeeId}</dd>
              </div>
              <div>
                <dt className="text-muted">Status</dt>
                <dd className="mt-0.5">
                  <StatusBadge status={selected.status} />
                </dd>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="font-medium text-charcoal">{selected.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Department</dt>
                <dd className="font-medium text-charcoal">{selected.department}</dd>
              </div>
              <div>
                <dt className="text-muted">Position Title</dt>
                <dd className="text-charcoal">{selected.position}</dd>
              </div>
              <div>
                <dt className="text-muted">Date Joined</dt>
                <dd className="text-charcoal">{selected.joined}</dd>
              </div>
            </div>

            <div className="border-t border-charcoal/8 pt-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-muted">Email</dt>
                  <dd className="text-charcoal">{selected.email}</dd>
                </div>
                <div>
                  <dt className="text-muted">Phone</dt>
                  <dd className="text-charcoal">{selected.phone}</dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === "add" && (
          <div className="grid gap-3.5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="First Name *"
                value={addForm.firstName}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, firstName: e.target.value }))
                }
                placeholder="e.g. Tariq"
                required
              />
              <Input
                label="Last Name *"
                value={addForm.lastName}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, lastName: e.target.value }))
                }
                placeholder="e.g. Mahmood"
                required
              />
            </div>

            <Input
              label="Email Address *"
              type="email"
              value={addForm.email}
              onChange={(e) =>
                setAddForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="tariq.m@luxurystay.com"
              required
            />

            <Input
              label="Password *"
              type="password"
              value={addForm.password}
              onChange={(e) =>
                setAddForm((p) => ({ ...p, password: e.target.value }))
              }
              placeholder="Temporary login password"
              required
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Role *"
                value={addForm.role}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, role: e.target.value }))
                }
                options={[
                  { value: "manager", label: "Manager" },
                  { value: "receptionist", label: "Receptionist" },
                  { value: "housekeeping", label: "Housekeeping" },
                  { value: "maintenance", label: "Maintenance" },
                  { value: "admin", label: "Admin" },
                ]}
              />

              <Select
                label="Department *"
                value={addForm.department}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, department: e.target.value }))
                }
                options={[
                  { value: "management", label: "Management" },
                  { value: "reception", label: "Reception" },
                  { value: "housekeeping", label: "Housekeeping" },
                  { value: "maintenance", label: "Maintenance" },
                  { value: "administration", label: "Administration" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Position / Title"
                value={addForm.position}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, position: e.target.value }))
                }
                placeholder="e.g. Night Supervisor"
              />
              <Input
                label="Phone"
                value={addForm.phone}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+92 300 0000000"
              />
            </div>

            <Input
              label="Custom Employee ID (Optional)"
              value={addForm.employeeId}
              onChange={(e) =>
                setAddForm((p) => ({ ...p, employeeId: e.target.value }))
              }
              placeholder="Leave blank for auto-generated LS-XXX-XXXX"
            />
          </div>
        )}

        {mode === "edit" && (
          <div className="grid gap-3.5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Role"
                value={editForm.role}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, role: e.target.value }))
                }
                options={[
                  { value: "manager", label: "Manager" },
                  { value: "receptionist", label: "Receptionist" },
                  { value: "housekeeping", label: "Housekeeping" },
                  { value: "maintenance", label: "Maintenance" },
                  { value: "admin", label: "Admin" },
                ]}
              />

              <Select
                label="Department"
                value={editForm.department}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, department: e.target.value }))
                }
                options={[
                  { value: "management", label: "Management" },
                  { value: "reception", label: "Reception" },
                  { value: "housekeeping", label: "Housekeeping" },
                  { value: "maintenance", label: "Maintenance" },
                  { value: "administration", label: "Administration" },
                ]}
              />
            </div>

            <Input
              label="Position / Title"
              value={editForm.position}
              onChange={(e) =>
                setEditForm((p) => ({ ...p, position: e.target.value }))
              }
              placeholder="e.g. Lead Receptionist"
            />

            <Input
              label="Phone Number"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm((p) => ({ ...p, phone: e.target.value }))
              }
              placeholder="+92 300 0000000"
            />

            <Select
              label="Account Status"
              value={editForm.status}
              onChange={(e) =>
                setEditForm((p) => ({ ...p, status: e.target.value }))
              }
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "suspended", label: "Suspended" },
              ]}
            />
          </div>
        )}

        {mode === "toggleStatus" && selected && (
          <div className="space-y-3 text-[14px]">
            <p>
              Are you sure you want to{" "}
              <strong className="text-charcoal">
                {selected.statusRaw === "active" ? "deactivate" : "activate"}
              </strong>{" "}
              account for{" "}
              <span className="font-semibold text-charcoal">{selected.name}</span> (
              {selected.email})?
            </p>
            {selected.statusRaw === "active" ? (
              <p className="text-[12px] text-muted">
                Deactivated staff members will be blocked from logging into the portal until reactivated.
              </p>
            ) : (
              <p className="text-[12px] text-muted">
                Activating this account will restore login permissions for this staff member.
              </p>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
