export default function Input({ label, id, className = "", ...props }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label ? (
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</span>
      ) : null}
      <input
        id={id}
        className="h-10 border border-charcoal/12 bg-white px-3 text-[14px] text-charcoal outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
        {...props}
      />
    </label>
  );
}
