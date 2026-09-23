import { Bell, CalendarCheck, CreditCard, MessageSquare, Sparkles, Wrench } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { notifications } from "../../data/admin";

const icons = {
  reservation: CalendarCheck,
  housekeeping: Sparkles,
  payment: CreditCard,
  maintenance: Wrench,
  feedback: MessageSquare,
  system: Bell,
};

export default function Notifications() {
  const today = notifications.filter((n) => n.group === "today");
  const earlier = notifications.filter((n) => n.group === "earlier");

  return (
    <div>
      <PageHeader title="Notifications" description="House alerts, arrivals, and operational notes." />
      <Group title="Today" items={today} />
      <Group title="Earlier" items={earlier} />
    </div>
  );
}

function Group({ title, items }) {
  return (
    <section className="mb-10">
      <h3 className="mb-4 text-[11px] uppercase tracking-[0.18em] text-gold">{title}</h3>
      <ul className="divide-y divide-charcoal/8 border border-charcoal/8 bg-white">
        {items.map((n) => {
          const Icon = icons[n.type] || Bell;
          return (
            <li key={n.id} className={`flex gap-4 px-5 py-4 ${n.read ? "bg-white" : "bg-ivory/70"}`}>
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border ${
                  n.read ? "border-charcoal/10 text-muted" : "border-gold/40 text-gold"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] font-medium text-charcoal">{n.title}</p>
                  {!n.read ? <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> : null}
                </div>
                <p className="mt-1 text-[13px] text-muted">{n.body}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted">{n.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
