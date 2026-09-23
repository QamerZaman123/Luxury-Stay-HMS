const tones = {
  available: "bg-emerald-50 text-emerald-800",
  occupied: "bg-charcoal/5 text-charcoal",
  reserved: "bg-[#B89B5E]/12 text-[#8a7340]",
  cleaning: "bg-sky-50 text-sky-800",
  maintenance: "bg-rose-50 text-rose-800",
  pending: "bg-amber-50 text-amber-800",
  confirmed: "bg-[#B89B5E]/12 text-[#8a7340]",
  "checked in": "bg-emerald-50 text-emerald-800",
  "checked out": "bg-charcoal/5 text-muted",
  cancelled: "bg-rose-50 text-rose-800",
  paid: "bg-emerald-50 text-emerald-800",
  unpaid: "bg-rose-50 text-rose-800",
  partial: "bg-amber-50 text-amber-800",
  overdue: "bg-rose-50 text-rose-800",
  refunded: "bg-charcoal/5 text-muted",
  completed: "bg-emerald-50 text-emerald-800",
  "in progress": "bg-sky-50 text-sky-800",
  delivered: "bg-emerald-50 text-emerald-800",
  reported: "bg-amber-50 text-amber-800",
  resolved: "bg-emerald-50 text-emerald-800",
  active: "bg-emerald-50 text-emerald-800",
  inactive: "bg-charcoal/5 text-muted",
  vip: "bg-[#B89B5E]/12 text-[#8a7340]",
  "in house": "bg-emerald-50 text-emerald-800",
  published: "bg-emerald-50 text-emerald-800",
  reviewed: "bg-sky-50 text-sky-800",
  high: "bg-rose-50 text-rose-800",
  medium: "bg-amber-50 text-amber-800",
  low: "bg-charcoal/5 text-muted",
  default: "bg-charcoal/5 text-charcoal",
};

export default function Badge({ children, tone }) {
  const key = (tone || children || "default").toString().toLowerCase();
  return (
    <span
      className={`inline-flex h-6 items-center px-2.5 text-[10px] font-medium uppercase tracking-[0.12em] ${
        tones[key] || tones.default
      }`}
    >
      {children}
    </span>
  );
}
