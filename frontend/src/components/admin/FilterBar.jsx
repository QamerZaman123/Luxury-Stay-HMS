export default function FilterBar({ children, className = "" }) {
  return <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end ${className}`}>{children}</div>;
}
