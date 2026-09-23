import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Dashboard from "../pages/admin/Dashboard";
import Rooms from "../pages/admin/Rooms";
import RoomTypes from "../pages/admin/RoomTypes";
import Reservations from "../pages/admin/Reservations";
import Stays from "../pages/admin/Stays";
import Guests from "../pages/admin/Guests";
import Staff from "../pages/admin/Staff";
import Invoices from "../pages/admin/Invoices";
import Payments from "../pages/admin/Payments";
import Services from "../pages/admin/Services";
import ServiceOrders from "../pages/admin/ServiceOrders";
import Housekeeping from "../pages/admin/Housekeeping";
import Maintenance from "../pages/admin/Maintenance";
import Feedback from "../pages/admin/Feedback";
import Notifications from "../pages/admin/Notifications";
import Settings from "../pages/admin/Settings";

const STAFF_ROLES = ["admin", "manager", "receptionist", "housekeeping", "maintenance"];

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Admin/Staff Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={STAFF_ROLES} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="stays" element={<Stays />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="room-types" element={<RoomTypes />} />
            <Route path="guests" element={<Guests />} />
            <Route path="staff" element={<Staff />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="payments" element={<Payments />} />
            <Route path="services" element={<Services />} />
            <Route path="service-orders" element={<ServiceOrders />} />
            <Route path="housekeeping" element={<Housekeeping />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
