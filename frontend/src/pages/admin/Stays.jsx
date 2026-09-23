import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { stays } from "../../data/admin";
import useTable from "../../hooks/useTable";

export default function Stays() {
  const table = useTable(stays, { searchKeys: ["guest", "room", "status", "id"], pageSize: 8 });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "guest", label: "Guest", sortable: true, render: (r) => <span className="font-medium">{r.guest}</span> },
    { key: "room", label: "Room" },
    { key: "checkIn", label: "Check-in", sortable: true },
    { key: "expectedOut", label: "Expected Check-out" },
    { key: "actualOut", label: "Actual Check-out" },
    { key: "status", label: "Status", sortable: true, render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => setSelected(r)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Stays" description="In-house guests and recently completed folios." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search stays" />
        <Select
          label="Status"
          options={["All", "In House", "Checked Out"]}
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
      <AdminModal open={!!selected} title={selected ? selected.guest : "Stay"} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="space-y-3 text-[13px]">
            <p>
              <span className="text-muted">Stay ID · </span>
              {selected.id}
            </p>
            <p>
              <span className="text-muted">Room · </span>
              {selected.room}
            </p>
            <p>
              <span className="text-muted">Arrived · </span>
              {selected.checkIn}
            </p>
            <p>
              <span className="text-muted">Expected departure · </span>
              {selected.expectedOut}
            </p>
            <p>
              <span className="text-muted">Actual departure · </span>
              {selected.actualOut}
            </p>
            <StatusBadge status={selected.status} />
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}
