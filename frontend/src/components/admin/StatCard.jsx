import * as Icons from "lucide-react";

export default function StatCard({ label, value, trend, trendUp, icon }) {
  const Icon = Icons[icon] || Icons.Minus;
  return (
    <article className="border border-charcoal/8 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(23,23,23,0.05)]">
      <div className="flex items-start justify-between">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center border border-charcoal/8 text-gold">
          <Icon size={16} strokeWidth={1.5} />
        </span>
      </div>
      <p className="mt-4 font-serif text-[34px] leading-none text-charcoal">{value}</p>
      {trend ? (
        <p className={`mt-3 text-[12px] ${trendUp ? "text-emerald-700" : "text-muted"}`}>{trend}</p>
      ) : null}
    </article>
  );
}
