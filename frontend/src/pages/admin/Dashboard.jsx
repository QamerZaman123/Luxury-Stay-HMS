import { useEffect, useState } from "react";
import {
  CalendarPlus,
  CreditCard,
  LogIn,
  Sparkles,
  Users,
  UserCheck,
  Wrench,
} from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import Button from "../../components/common/Button";
import {
  dashboardStats as defaultStats,
  occupancySeries,
  roomStatusCounts,
  upcomingCheckIns,
  upcomingCheckOuts,
  recentActivity,
} from "../../data/admin";
import { formatDateLong, greetingForHour } from "../../utils/format";
import { useAuth } from "../../context/AuthContext";
import { staffApi, guestApi } from "../../services/api";

const activityIcon = {
  reservation: CalendarPlus,
  checkin: LogIn,
  housekeeping: Sparkles,
  payment: CreditCard,
  maintenance: Wrench,
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(defaultStats);
  const [liveCounts, setLiveCounts] = useState({ staff: 0, guests: 0 });

  const firstName = user?.firstName || "Administrator";
  const maxOcc = Math.max(...occupancySeries.map((d) => d.occupancy));
  const totalRooms = roomStatusCounts.reduce((sum, s) => sum + s.count, 0);

  useEffect(() => {
    async function loadLiveCounts() {
      try {
        const [staffRes, guestRes] = await Promise.allSettled([
          staffApi.getAll(),
          guestApi.getAll(),
        ]);

        let staffCount = 0;
        let guestCount = 0;

        if (staffRes.status === "fulfilled" && staffRes.value?.count !== undefined) {
          staffCount = staffRes.value.count;
        }
        if (guestRes.status === "fulfilled" && guestRes.value?.count !== undefined) {
          guestCount = guestRes.value.count;
        }

        setLiveCounts({ staff: staffCount, guests: guestCount });

        setStats((prev) => {
          const updated = [...prev];
          // Optionally enrich cards with live staff and guest metrics
          return updated;
        });
      } catch (err) {
        // Fallback gracefully to default metrics
      }
    }

    loadLiveCounts();
  }, []);

  return (
    <div>
      <PageHeader
        title={`${greetingForHour()}, ${firstName}`}
        description={`Here's what's happening at LuxuryStay today. ${formatDateLong()}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {liveCounts.staff > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-4 border border-charcoal/8 bg-white px-5 py-3 text-[13px]">
          <span className="flex items-center gap-1.5 font-medium text-charcoal">
            <Users size={15} className="text-gold" />
            Active Staff Team:{" "}
            <span className="font-bold text-charcoal">{liveCounts.staff}</span>
          </span>
          <span className="text-charcoal/20">|</span>
          <span className="flex items-center gap-1.5 font-medium text-charcoal">
            <UserCheck size={15} className="text-gold" />
            Registered Guest Profiles:{" "}
            <span className="font-bold text-charcoal">{liveCounts.guests}</span>
          </span>
          <span className="ml-auto text-[11px] uppercase tracking-[0.14em] text-muted">
            Live Database Sync
          </span>
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="border border-charcoal/8 bg-white p-6 xl:col-span-2">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Occupancy</p>
              <h3 className="mt-1 font-serif text-[24px] text-charcoal">This week</h3>
            </div>
            <p className="text-[13px] text-muted">Peak {maxOcc}%</p>
          </div>
          <div className="flex h-52 items-end gap-3 md:gap-5">
            {occupancySeries.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end bg-ivory">
                  <div
                    className="w-full bg-charcoal transition-all duration-500"
                    style={{ height: `${(d.occupancy / 100) * 100}%` }}
                    title={`${d.occupancy}%`}
                  >
                    <div className="h-1 w-full bg-gold" />
                  </div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-charcoal/8 bg-white p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Room Status</p>
          <h3 className="mt-1 font-serif text-[24px] text-charcoal">House snapshot</h3>
          <ul className="mt-6 space-y-4">
            {roomStatusCounts.map((item) => (
              <li key={item.status}>
                <div className="mb-1.5 flex items-center justify-between text-[13px]">
                  <span className="text-charcoal">{item.status}</span>
                  <span className="text-muted">{item.count}</span>
                </div>
                <div className="h-[3px] bg-ivory">
                  <div
                    className={`h-full ${
                      item.tone === "available"
                        ? "bg-emerald-700"
                        : item.tone === "occupied"
                          ? "bg-charcoal"
                          : item.tone === "reserved"
                            ? "bg-gold"
                            : item.tone === "cleaning"
                              ? "bg-sky-700"
                              : "bg-rose-700"
                    }`}
                    style={{ width: `${(item.count / totalRooms) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <StayList title="Upcoming check-ins" rows={upcomingCheckIns} />
        <StayList title="Upcoming check-outs" rows={upcomingCheckOuts} />
      </div>

      <section className="mt-6 border border-charcoal/8 bg-white p-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Activity</p>
        <h3 className="mt-1 font-serif text-[24px] text-charcoal">Recent hotel activity</h3>
        <ul className="mt-6 divide-y divide-charcoal/8">
          {recentActivity.map((item) => {
            const Icon = activityIcon[item.type] || CalendarPlus;
            return (
              <li key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-charcoal/10 text-gold">
                  <Icon size={15} strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-charcoal">{item.text}</p>
                  <p className="mt-1 text-[12px] text-muted">{item.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function StayList({ title, rows }) {
  return (
    <section className="border border-charcoal/8 bg-white p-6">
      <h3 className="font-serif text-[24px] text-charcoal">{title}</h3>
      <ul className="mt-5 divide-y divide-charcoal/8">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[14px] font-medium text-charcoal">{row.guest}</p>
              <p className="mt-0.5 text-[12px] text-muted">
                {row.room} · {row.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={row.status} />
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
