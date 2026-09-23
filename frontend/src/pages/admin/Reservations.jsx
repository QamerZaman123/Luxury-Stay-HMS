import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import { reservations } from "../../data/admin";
import useTable from "../../hooks/useTable";

export default function Reservations() {
  const table = useTable(reservations, {
    searchKeys: ["id", "guest", "room", "status", "payment"],
    pageSize: 8,
  });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "id", label: "Reservation ID", sortable: true, render: (r) => <span className="font-medium">{r.id}</span> },
    { key: "guest", label: "Guest", sortable: true },
    { key: "room", label: "Room" },
    { key: "checkIn", label: "Check-in", sortable: true },
    { key: "checkOut", label: "Check-out" },
    { key: "guests", label: "Guests" },
    { key: "status", label: "Status", sortable: true, render: (r) => <StatusBadge status={r.status} /> },
    { key: "payment", label: "Payment", render: (r) => <StatusBadge status={r.payment} /> },
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
      <PageHeader title="Reservations" description="Bookings across the house, from pending to in-house." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search reservations" />
        <Input type="date" label="Date" />
        <Select
          label="Status"
          options={["All", "Pending", "Confirmed", "Checked In", "Checked Out", "Cancelled"]}
          value={table.filters.status || "All"}
          onChange={(e) => table.setFilter("status", e.target.value)}
        />
        <Select
          label="Room"
          options={["All", ...new Set(reservations.map((r) => r.room))]}
          value={table.filters.room || "All"}
          onChange={(e) => table.setFilter("room", e.target.value)}
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
          <dl className="grid grid-cols-2 gap-4 text-[13px]">
            <div className="col-span-2">
              <dt className="text-muted">Guest</dt>
              <dd className="mt-1 text-charcoal">{selected.guest}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Room</dt>
              <dd className="mt-1 text-charcoal">{selected.room}</dd>
            </div>
            <div>
              <dt className="text-muted">Check-in</dt>
              <dd className="mt-1">{selected.checkIn}</dd>
            </div>
            <div>
              <dt className="text-muted">Check-out</dt>
              <dd className="mt-1">{selected.checkOut}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd className="mt-1">
                <StatusBadge status={selected.status} />
              </dd>
            </div>
            <div>
              <dt className="text-muted">Payment</dt>
              <dd className="mt-1">
                <StatusBadge status={selected.payment} />
              </dd>
            </div>
          </dl>
        ) : null}
      </AdminModal>
    </div>
  );
}
