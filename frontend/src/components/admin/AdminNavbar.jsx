import { useState } from "react";
import { Bell, ChevronDown, LogOut, Menu, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "../../data/admin";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar({ title, breadcrumb, onMenu }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
    : "LS";
  const displayName = user
    ? `${user.firstName} ${user.lastName}`
    : "Staff Member";
  const displayRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Staff";

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-charcoal/8 bg-ivory/90 px-4 backdrop-blur-md md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          className="flex h-9 w-9 items-center justify-center text-charcoal lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <div className="min-w-0">
          {breadcrumb ? (
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{breadcrumb}</p>
          ) : null}
          <h2 className="truncate font-serif text-[20px] text-charcoal">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <label className="relative hidden md:block">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search hotel"
            className="h-9 w-52 border border-charcoal/10 bg-white pl-9 pr-3 text-[13px] outline-none placeholder:text-muted/70 focus:border-gold lg:w-64"
            aria-label="Search hotel"
          />
        </label>

        <Link
          to="/admin/notifications"
          className="relative flex h-9 w-9 items-center justify-center text-charcoal hover:text-gold"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.5} />
          {unread > 0 ? (
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
          ) : null}
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 py-1 pl-1 pr-2 hover:bg-white"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-charcoal font-serif text-[12px] text-gold">
              {initials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[13px] font-medium leading-tight text-charcoal">{displayName}</span>
              <span className="block text-[11px] text-muted">{displayRole}</span>
            </span>
            <ChevronDown size={14} className="hidden text-muted sm:block" />
          </button>
          {profileOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-12 w-48 border border-charcoal/10 bg-white py-2 shadow-[0_12px_40px_rgba(23,23,23,0.1)]"
            >
              <div className="border-b border-charcoal/8 px-4 py-2">
                <p className="text-[12px] font-semibold text-charcoal truncate">{displayName}</p>
                <p className="text-[11px] text-muted truncate">{user?.email}</p>
              </div>
              <Link
                to="/admin/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-[13px] text-charcoal hover:bg-ivory"
              >
                <User size={14} /> Account Settings
              </Link>
              <Link
                to="/"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-[13px] text-charcoal hover:bg-ivory"
              >
                <LogOut size={14} /> Back to site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-[13px] text-rose-700 hover:bg-rose-50"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
