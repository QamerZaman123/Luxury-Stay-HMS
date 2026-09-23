import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  DoorOpen,
  Layers,
  Users,
  UserCog,
  FileText,
  CreditCard,
  ConciergeBell,
  ClipboardList,
  Sparkles,
  Wrench,
  MessageSquare,
  Bell,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const sections = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Operations",
    items: [
      { to: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
      { to: "/admin/stays", label: "Stays", icon: BedDouble },
      { to: "/admin/rooms", label: "Rooms", icon: DoorOpen },
      { to: "/admin/room-types", label: "Room Types", icon: Layers },
    ],
  },
  {
    label: "People",
    items: [
      { to: "/admin/guests", label: "Guests", icon: Users },
      { to: "/admin/staff", label: "Staff", icon: UserCog },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/admin/invoices", label: "Invoices", icon: FileText },
      { to: "/admin/payments", label: "Payments", icon: CreditCard },
    ],
  },
  {
    label: "Services",
    items: [
      { to: "/admin/services", label: "Services", icon: ConciergeBell },
      { to: "/admin/service-orders", label: "Service Orders", icon: ClipboardList },
    ],
  },
  {
    label: "Hotel Operations",
    items: [
      { to: "/admin/housekeeping", label: "Housekeeping", icon: Sparkles },
      { to: "/admin/maintenance", label: "Maintenance", icon: Wrench },
    ],
  },
  {
    label: "Engagement",
    items: [
      { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
      { to: "/admin/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "System",
    items: [{ to: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export default function AdminSidebar({ collapsed, onToggle, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-charcoal/50 lg:hidden"
          aria-label="Close navigation"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-charcoal text-ivory transition-all duration-300 ease-luxury ${
          collapsed ? "w-[76px]" : "w-[248px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className={`flex h-16 items-center border-b border-white/10 ${collapsed ? "justify-center px-3" : "px-5"}`}>
          {collapsed ? (
            <span className="font-serif text-[20px] text-gold">L</span>
          ) : (
            <div>
              <p className="font-serif text-[15px] font-semibold tracking-[0.2em] uppercase">LuxuryStay</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/45">Hotel Management</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4" aria-label="Admin">
          {sections.map((section) => (
            <div key={section.label} className="mb-4">
              {!collapsed ? (
                <p className="mb-1 px-5 text-[10px] uppercase tracking-[0.2em] text-white/35">{section.label}</p>
              ) : null}
              <ul>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={onClose}
                        title={collapsed ? item.label : undefined}
                        className={({ isActive }) =>
                          `flex items-center gap-3 py-2.5 text-[13px] transition-colors ${
                            collapsed ? "justify-center px-3" : "px-5"
                          } ${
                            isActive
                              ? "border-l-2 border-gold bg-white/5 text-gold"
                              : "border-l-2 border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                          }`
                        }
                      >
                        <Icon size={17} strokeWidth={1.5} />
                        {!collapsed ? <span>{item.label}</span> : null}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-3 lg:block">
          <button
            type="button"
            onClick={onToggle}
            className="flex h-9 w-full items-center justify-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            {!collapsed ? "Collapse" : null}
          </button>
        </div>
      </aside>
    </>
  );
}
