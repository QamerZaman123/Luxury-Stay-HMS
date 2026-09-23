import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { rooms } from "../../data/admin";
import { formatCurrency } from "../../utils/format";
import useTable from "../../hooks/useTable";

export default function Rooms() {
  const table = useTable(rooms, { searchKeys: ["name", "type", "guest", "status"], pageSize: 8 });
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const columns = [
    { key: "name", label: "Room", sortable: true, render: (r) => <span className="font-medium">#{r.name}</span> },
    { key: "type", label: "Room Type", sortable: true },
    { key: "floor", label: "Floor", sortable: true },
    { key: "status", label: "Status", sortable: true, render: (r) => <StatusBadge status={r.status} /> },
    { key: "price", label: "Price", sortable: true, render: (r) => formatCurrency(r.price) },
    { key: "guest", label: "Current Guest" },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelected(r)}>
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelected(r)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Rooms"
        description="Inventory, status, and in-house occupancy across the property."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Add Room
          </Button>
        }
      />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search rooms" />
        <Select
          options={["All", "Deluxe King", "Executive Suite", "Presidential Suite"]}
          value={table.filters.type || "All"}
          onChange={(e) => table.setFilter("type", e.target.value)}
          label="Room type"
        />
        <Select
          options={["All", "Available", "Occupied", "Reserved", "Cleaning", "Maintenance"]}
          value={table.filters.status || "All"}
          onChange={(e) => table.setFilter("status", e.target.value)}
          label="Status"
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
        title={selected ? `Room ${selected.name}` : ""}
        onClose={() => setSelected(null)}
        onConfirm={() => setSelected(null)}
        confirmLabel="Save changes"
      >
        {selected ? (
          <dl className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="mt-1 text-charcoal">{selected.type}</dd>
            </div>
            <div>
              <dt className="text-muted">Floor</dt>
              <dd className="mt-1 text-charcoal">{selected.floor}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd className="mt-1">
                <StatusBadge status={selected.status} />
              </dd>
            </div>
            <div>
              <dt className="text-muted">Nightly rate</dt>
              <dd className="mt-1 text-charcoal">{formatCurrency(selected.price)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Current guest</dt>
              <dd className="mt-1 text-charcoal">{selected.guest}</dd>
            </div>
          </dl>
        ) : null}
      </AdminModal>
      <AdminModal
        open={addOpen}
        title="Add room"
        onClose={() => setAddOpen(false)}
        onConfirm={() => setAddOpen(false)}
        confirmLabel="Add room"
      >
        <p>Room creation will connect to the property inventory in a later release. This preview uses static data.</p>
      </AdminModal>
    </div>
  );
}
