export default function Select({ label, id, options = [], className = "", ...props }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label ? (
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</span>
      ) : null}
      <select
        id={id}
        className="h-10 border border-charcoal/12 bg-white px-3 text-[14px] text-charcoal outline-none transition-colors focus:border-gold"
        {...props}
      >
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const labelText = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
    </label>
  );
}
