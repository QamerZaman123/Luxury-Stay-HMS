import { useEffect, useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "../../data/content";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isStaff, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const bar =
    scrolled || open
      ? "bg-ivory/95 text-charcoal shadow-[0_1px_0_rgba(23,23,23,0.06)] backdrop-blur-md"
      : "bg-transparent text-white";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxury ${bar}`}>
      <nav className="container-site flex h-[76px] items-center justify-between" aria-label="Primary">
        <a href="#home" className="font-serif text-[22px] font-semibold tracking-[0.22em] uppercase">
          LuxuryStay
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                  scrolled ? "text-charcoal/80 hover:text-charcoal" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {isStaff && (
                <Link
                  to="/admin"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                    scrolled ? "text-gold hover:text-charcoal" : "text-gold hover:text-white"
                  }`}
                >
                  <LayoutDashboard size={14} /> Portal
                </Link>
              )}
              <span
                className={`text-[12px] tracking-[0.12em] ${
                  scrolled ? "text-charcoal" : "text-white/90"
                }`}
              >
                Hello, <span className="font-semibold">{user.firstName}</span>
              </span>
              <button
                type="button"
                onClick={logout}
                className={`inline-flex items-center gap-1 px-3 py-2 text-[12px] uppercase tracking-[0.16em] transition-colors ${
                  scrolled ? "text-muted hover:text-charcoal" : "text-white/70 hover:text-white"
                }`}
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                scrolled ? "text-charcoal/80 hover:text-charcoal" : "text-white/90 hover:text-gold"
              }`}
            >
              Sign In
            </Link>
          )}

          <a
            href="#booking"
            className={`px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-luxury ${
              scrolled
                ? "bg-gold text-charcoal hover:bg-[#a88a4e]"
                : "border border-white/80 text-white hover:bg-white hover:text-charcoal"
            }`}
          >
            Book a Stay
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t transition-all duration-500 ease-luxury lg:hidden ${
          open
            ? "max-h-[480px] border-charcoal/10 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        } ${scrolled || open ? "bg-ivory" : "bg-charcoal/95"}`}
      >
        <ul className="container-site flex flex-col gap-1 py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-[13px] font-medium uppercase tracking-[0.18em] ${
                  scrolled || open ? "text-charcoal" : "text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <div className="py-2 text-[13px] text-charcoal">
                  Signed in as <span className="font-semibold">{user.firstName} {user.lastName}</span>
                </div>
                {isStaff && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="btn-secondary w-full text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="py-2 text-left text-[12px] uppercase tracking-[0.16em] text-rose-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className={`py-2 text-[12px] uppercase tracking-[0.16em] ${
                  scrolled || open ? "text-muted" : "text-white/80"
                }`}
              >
                Sign In
              </Link>
            )}
            <a href="#booking" onClick={() => setOpen(false)} className="btn-primary w-full text-center">
              Book a Stay
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
