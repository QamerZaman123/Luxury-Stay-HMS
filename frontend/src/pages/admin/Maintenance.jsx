import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { maintenanceRequests } from "../../data/admin";
import useTable from "../../hooks/useTable";

export default function Maintenance() {
  const table = useTable(maintenanceRequests, { searchKeys: ["id", "room", "issue", "staff", "status"], pageSize: 8 });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "id", label: "Request ID", sortable: true, render: (r) => <span className="font-medium">{r.id}</span> },
    { key: "room", label: "Room", render: (r) => `#${r.room}` },
    { key: "issue", label: "Issue" },
    { key: "priority", label: "Priority", render: (r) => <StatusBadge status={r.priority} /> },
    { key: "staff", label: "Assigned Staff" },
    { key: "status", label: "Status", sortable: true, render: (r) => <StatusBadge status={r.status} /> },
    { key: "created", label: "Created Date" },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => setSelected(r)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Maintenance" description="Reported issues, assignments, and resolution status." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search requests" />
        <Select
          label="Status"
          options={["All", "Reported", "In Progress", "Resolved"]}
          value={table.filters.status || "All"}
          onChange={(e) => table.setFilter("status", e.target.value)}
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
      <AdminModal open={!!selected} title={selected?.id} onClose={() => setSelected(null)}>
        {selected ? (
          <p>
            Room {selected.room}: {selected.issue}
          </p>
        ) : null}
      </AdminModal>
    </div>
  );
}
