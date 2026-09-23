import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { payments } from "../../data/admin";
import { formatCurrency } from "../../utils/format";
import useTable from "../../hooks/useTable";

export default function Payments() {
  const table = useTable(payments, { searchKeys: ["id", "guest", "invoice", "method", "status"], pageSize: 8 });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "id", label: "Payment ID", sortable: true, render: (r) => <span className="font-medium">{r.id}</span> },
    { key: "guest", label: "Guest", sortable: true },
    { key: "invoice", label: "Invoice" },
    { key: "amount", label: "Amount", sortable: true, render: (r) => formatCurrency(r.amount) },
    { key: "method", label: "Payment Method" },
    { key: "date", label: "Date", sortable: true },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
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
      <PageHeader title="Payments" description="Settled, partial, and refunded transactions." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search payments" />
        <Select
          label="Status"
          options={["All", "Completed", "Refunded"]}
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
            {selected.guest} paid {formatCurrency(selected.amount)} via {selected.method} on {selected.date}.
          </p>
        ) : null}
      </AdminModal>
    </div>
  );
}
