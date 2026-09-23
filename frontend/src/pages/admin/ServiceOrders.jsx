import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { serviceOrders } from "../../data/admin";
import { formatCurrency } from "../../utils/format";
import useTable from "../../hooks/useTable";

export default function ServiceOrders() {
  const table = useTable(serviceOrders, { searchKeys: ["id", "guest", "service", "status"], pageSize: 8 });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "id", label: "Order ID", sortable: true, render: (r) => <span className="font-medium">{r.id}</span> },
    { key: "guest", label: "Guest", sortable: true },
    { key: "service", label: "Service" },
    { key: "qty", label: "Quantity" },
    { key: "amount", label: "Amount", sortable: true, render: (r) => formatCurrency(r.amount) },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "date", label: "Date" },
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
      <PageHeader title="Service Orders" description="In-stay requests from dining to spa." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search orders" />
        <Select
          label="Status"
          options={["All", "Pending", "Confirmed", "In Progress", "Delivered", "Completed"]}
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
            {selected.guest} · {selected.service} × {selected.qty} · {formatCurrency(selected.amount)}
          </p>
        ) : null}
      </AdminModal>
    </div>
  );
}
