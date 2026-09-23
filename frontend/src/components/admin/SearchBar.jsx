import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search" }) {
  return (
    <label className="relative block min-w-[200px] flex-1">
      <Search
        size={15}
        strokeWidth={1.6}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full border border-charcoal/12 bg-white pl-9 pr-3 text-[13px] text-charcoal outline-none placeholder:text-muted/70 focus:border-gold"
        aria-label={placeholder}
      />
    </label>
  );
}
