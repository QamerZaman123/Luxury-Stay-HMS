export default function Loading({ label = "Loading" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-[12px] uppercase tracking-[0.16em] text-muted" role="status">
      <span className="h-1.5 w-1.5 animate-pulse bg-gold" />
      {label}
    </div>
  );
}
