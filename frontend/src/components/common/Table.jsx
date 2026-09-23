import { ArrowDown, ArrowUp } from "lucide-react";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

export default function Table({
  columns,
  rows,
  sort,
  onSort,
  page,
  pageCount,
  total,
  onPage,
  rowKey = "id",
}) {
  return (
    <div className="overflow-hidden border border-charcoal/8 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-charcoal/8 bg-ivory/70">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort?.(col.key)}
                      className="inline-flex items-center gap-1.5 hover:text-charcoal"
                    >
                      {col.label}
                      {sort?.key === col.key ? (
                        sort.dir === "asc" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : null}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title="No matching records" description="Try a different search or filter." />
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row[rowKey]} className="border-b border-charcoal/6 last:border-0 hover:bg-ivory/50">
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-5 py-4 text-[13px] text-charcoal">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {onPage ? <Pagination page={page} pageCount={pageCount} total={total} onPage={onPage} /> : null}
    </div>
  );
}
