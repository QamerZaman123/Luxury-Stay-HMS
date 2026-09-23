import { useState } from "react";
import { Star } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FilterBar from "../../components/admin/FilterBar";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { feedback } from "../../data/admin";
import useTable from "../../hooks/useTable";

function Stars({ rating }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          strokeWidth={1.4}
          className={n <= rating ? "fill-gold text-gold" : "text-charcoal/20"}
        />
      ))}
    </span>
  );
}

export default function Feedback() {
  const table = useTable(feedback, { searchKeys: ["guest", "comment", "status"], pageSize: 8 });
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "guest", label: "Guest", sortable: true, render: (r) => <span className="font-medium">{r.guest}</span> },
    { key: "rating", label: "Rating", sortable: true, render: (r) => <Stars rating={r.rating} /> },
    {
      key: "comment",
      label: "Feedback",
      render: (r) => <span className="block max-w-xs truncate text-muted">{r.comment}</span>,
    },
    { key: "stay", label: "Stay" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => setSelected(r)}>
          Review
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Feedback" description="Guest notes from recent stays." />
      <FilterBar className="mb-5">
        <SearchBar value={table.query} onChange={table.setQuery} placeholder="Search feedback" />
        <Select
          label="Status"
          options={["All", "Pending", "Reviewed", "Published"]}
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
      <AdminModal open={!!selected} title={selected?.guest} onClose={() => setSelected(null)}>
        {selected ? (
          <div>
            <Stars rating={selected.rating} />
            <p className="mt-3 font-serif text-[18px] leading-relaxed text-charcoal">{selected.comment}</p>
            <p className="mt-3 text-[12px] text-muted">
              {selected.stay} · {selected.date}
            </p>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}
