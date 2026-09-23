import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageCount, total, onPage }) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 border-t border-charcoal/8 px-5 py-4 sm:flex-row sm:items-center">
      <p className="text-[12px] text-muted">
        {total} {total === 1 ? "record" : "records"}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center border border-charcoal/12 text-charcoal disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="min-w-[72px] text-center text-[12px] text-muted">
          {page} / {pageCount}
        </span>
        <button
          type="button"
          onClick={() => onPage(Math.min(pageCount, page + 1))}
          disabled={page >= pageCount}
          className="flex h-8 w-8 items-center justify-center border border-charcoal/12 text-charcoal disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
