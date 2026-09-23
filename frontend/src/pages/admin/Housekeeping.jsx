import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { housekeepingTasks } from "../../data/admin";
import useTable from "../../hooks/useTable";

export default function Housekeeping() {
  const table = useTable(housekeepingTasks, { searchKeys: ["room", "type", "task", "staff", "status"], pageSize: 8 });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "room", label: "Room", sortable: true, render: (r) => <span className="font-medium">#{r.room}</span> },
    { key: "type", label: "Room Type" },
    { key: "task", label: "Task" },
    { key: "staff", label: "Assigned Staff" },
    { key: "priority", label: "Priority", render: (r) => <StatusBadge status={r.priority} /> },
    { key: "status", label: "Status", sortable: true, render: (r) => <StatusBadge status={r.status} /> },
    { key: "updated", label: "Updated" },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => setSelected(r)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Housekeeping" description="Rooms requiring service, assigned staff, and priority." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search tasks" />
        <Select
          label="Status"
          options={["All", "Pending", "In Progress", "Completed"]}
          value={table.filters.status || "All"}
          onChange={(e) => table.setFilter("status", e.target.value)}
        />
        <Select
          label="Priority"
          options={["All", "High", "Medium", "Low"]}
          value={table.filters.priority || "All"}
          onChange={(e) => table.setFilter("priority", e.target.value)}
        />
      </FilterBar>
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
      <AdminModal
        open={!!selected}
        title={selected ? `Room ${selected.room}` : ""}
        onClose={() => setSelected(null)}
        onConfirm={() => setSelected(null)}
        confirmLabel="Save status"
      >
        {selected ? (
          <p>
            {selected.task} · {selected.staff} · {selected.priority} priority
          </p>
        ) : null}
      </AdminModal>
    </div>
  );
}
