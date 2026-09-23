import { useMemo, useState } from "react";

export default function useTable(rows, { searchKeys = [], pageSize = 8 } = {}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !q ||
        searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q));
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || value === "All") return true;
        return String(row[key]) === String(value);
      });
      return matchesQuery && matchesFilters;
    });
  }, [rows, query, filters, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  return {
    query,
    setQuery: (value) => {
      setQuery(value);
      setPage(1);
    },
    filters,
    setFilter,
    sort,
    toggleSort,
    page: currentPage,
    setPage,
    pageCount,
    pageRows,
    total: sorted.length,
  };
}
