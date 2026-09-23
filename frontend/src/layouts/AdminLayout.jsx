import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const titles = {
  "/admin": { title: "Dashboard", crumb: "Overview" },
  "/admin/reservations": { title: "Reservations", crumb: "Operations" },
  "/admin/stays": { title: "Stays", crumb: "Operations" },
  "/admin/rooms": { title: "Rooms", crumb: "Operations" },
  "/admin/room-types": { title: "Room Types", crumb: "Operations" },
  "/admin/guests": { title: "Guests", crumb: "People" },
  "/admin/staff": { title: "Staff", crumb: "People" },
  "/admin/invoices": { title: "Invoices", crumb: "Finance" },
  "/admin/payments": { title: "Payments", crumb: "Finance" },
  "/admin/services": { title: "Services", crumb: "Services" },
  "/admin/service-orders": { title: "Service Orders", crumb: "Services" },
  "/admin/housekeeping": { title: "Housekeeping", crumb: "Hotel Operations" },
  "/admin/maintenance": { title: "Maintenance", crumb: "Hotel Operations" },
  "/admin/feedback": { title: "Feedback", crumb: "Engagement" },
  "/admin/notifications": { title: "Notifications", crumb: "Engagement" },
  "/admin/settings": { title: "Settings", crumb: "System" },
};

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const meta = titles[pathname] || { title: "Admin", crumb: "LuxuryStay" };

  return (
    <div className="min-h-screen bg-ivory">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className={`min-h-screen transition-all duration-300 ease-luxury ${collapsed ? "lg:pl-[76px]" : "lg:pl-[248px]"}`}>
        <AdminNavbar title={meta.title} breadcrumb={meta.crumb} onMenu={() => setMobileOpen(true)} />
        <div className="px-4 py-8 md:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
