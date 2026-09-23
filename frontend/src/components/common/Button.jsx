const variants = {
  primary:
    "bg-gold text-charcoal hover:bg-[#a88a4e] focus-visible:outline-gold",
  dark: "bg-charcoal text-ivory hover:bg-black focus-visible:outline-charcoal",
  outline:
    "border border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40 hover:bg-ivory focus-visible:outline-charcoal",
  ghost: "text-charcoal hover:bg-charcoal/5 focus-visible:outline-charcoal",
  danger:
    "border border-red-200 bg-white text-red-700 hover:bg-red-50 focus-visible:outline-red-400",
};

const sizes = {
  sm: "h-9 px-3.5 text-[11px]",
  md: "h-10 px-4 text-[12px]",
  lg: "h-11 px-5 text-[12px]",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...props
}) {
  return (
    <Tag
      type={Tag === "button" ? type : undefined}
      className={`inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.14em] transition-all duration-300 ease-luxury focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
