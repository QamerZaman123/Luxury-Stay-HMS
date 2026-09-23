import { useEffect, useMemo, useState } from "react";
import { RefreshCw, ShieldAlert } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import Loading from "../../components/common/Loading";
import useTable from "../../hooks/useTable";
import { guestApi } from "../../services/api";

export default function Guests() {
  const [rawGuests, setRawGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchGuests = async () => {
    setLoading(true);
    setApiError("");
    try {
      const data = await guestApi.getAll();
      if (data && data.success && Array.isArray(data.guestProfiles)) {
        setRawGuests(data.guestProfiles);
      } else {
        setRawGuests([]);
      }
    } catch (err) {
      setApiError(err.message || "Failed to load guest profiles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const formattedGuests = useMemo(() => {
    return rawGuests.map((gp) => {
      const fullName = `${gp.user?.firstName || ""} ${gp.user?.lastName || ""}`.trim() || "Guest";
      const statusStr = gp.user?.status || "active";

      const addressStr = gp.address
        ? [gp.address.street, gp.address.city, gp.address.country].filter(Boolean).join(", ")
        : "—";

      return {
        id: gp._id,
        name: fullName,
        email: gp.user?.email || "—",
        phone: gp.user?.phone || "—",
        nationality: gp.nationality || "—",
        status: statusStr.charAt(0).toUpperCase() + statusStr.slice(1),
        statusRaw: statusStr,
        gender: gp.gender || "—",
        dob: gp.dateOfBirth
          ? new Date(gp.dateOfBirth).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
        addressStr,
        preferences: gp.preferences,
        identification: gp.identification,
        raw: gp,
      };
    });
  }, [rawGuests]);

  const table = useTable(formattedGuests, {
    searchKeys: ["name", "email", "phone", "nationality", "status"],
    pageSize: 8,
  });

  const columns = [
    {
      key: "name",
      label: "Guest",
      sortable: true,
      render: (r) => (
        <div>
          <p className="font-medium text-charcoal">{r.name}</p>
          <p className="text-[11px] text-muted">{r.nationality}</p>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "nationality", label: "Nationality", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => setSelected(r)}>
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Guest Profiles"
        description="Registered guest records, identification, and hospitality preferences."
        actions={
          <Button variant="outline" size="sm" onClick={fetchGuests} disabled={loading}>
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </Button>
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
          placeholder="Search guests by name, email, nationality..."
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
          <Loading message="Loading guest profiles from backend..." />
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
        open={!!selected}
        title={selected ? `Guest: ${selected.name}` : "Guest Profile"}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <dl className="space-y-3.5 text-[13px]">
            <div className="grid grid-cols-2 gap-4 border-b border-charcoal/8 pb-3">
              <div>
                <dt className="text-muted">Full Name</dt>
                <dd className="font-semibold text-charcoal">{selected.name}</dd>
              </div>
              <div>
                <dt className="text-muted">Account Status</dt>
                <dd className="mt-0.5">
                  <StatusBadge status={selected.status} />
                </dd>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="text-charcoal">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="text-charcoal">{selected.phone}</dd>
              </div>
              <div>
                <dt className="text-muted">Nationality</dt>
                <dd className="text-charcoal">{selected.nationality}</dd>
              </div>
              <div>
                <dt className="text-muted">Date of Birth</dt>
                <dd className="text-charcoal">{selected.dob}</dd>
              </div>
            </div>

            {selected.addressStr !== "—" && (
              <div className="border-t border-charcoal/8 pt-3">
                <dt className="text-muted">Address</dt>
                <dd className="text-charcoal">{selected.addressStr}</dd>
              </div>
            )}

            {selected.preferences && (
              <div className="border-t border-charcoal/8 pt-3">
                <dt className="mb-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                  Hospitality Preferences
                </dt>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  {selected.preferences.roomPreference && (
                    <p>
                      <strong className="text-charcoal">Room:</strong>{" "}
                      {selected.preferences.roomPreference}
                    </p>
                  )}
                  {selected.preferences.bedPreference && (
                    <p>
                      <strong className="text-charcoal">Bed:</strong>{" "}
                      {selected.preferences.bedPreference}
                    </p>
                  )}
                  {selected.preferences.foodPreference && (
                    <p>
                      <strong className="text-charcoal">Diet:</strong>{" "}
                      {selected.preferences.foodPreference}
                    </p>
                  )}
                  {selected.preferences.specialRequests && (
                    <p className="col-span-2">
                      <strong className="text-charcoal">Special:</strong>{" "}
                      {selected.preferences.specialRequests}
                    </p>
                  )}
                </div>
              </div>
            )}

            {selected.identification && (
              <div className="border-t border-charcoal/8 pt-3">
                <dt className="text-muted">Identification</dt>
                <dd className="text-charcoal">
                  {selected.identification.documentType || "ID"}:{" "}
                  {selected.identification.documentNumber || "Not provided"}
                </dd>
              </div>
            )}
          </dl>
        ) : null}
      </AdminModal>
    </div>
  );
}
