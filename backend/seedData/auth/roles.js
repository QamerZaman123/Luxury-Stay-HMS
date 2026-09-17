module.exports = [
  { _id: "100000000000000000000001", name: "admin", description: "Full system access", permissions: ["manage_users", "manage_hotels"], isActive: true },
  { _id: "100000000000000000000002", name: "manager", description: "Hotel operations access", permissions: ["manage_reservations", "view_reports"], isActive: true },
  { _id: "100000000000000000000003", name: "receptionist", description: "Front desk access", permissions: ["manage_guests", "check_in", "check_out"], isActive: true },
  { _id: "100000000000000000000004", name: "housekeeping", description: "Room cleaning access", permissions: ["manage_housekeeping"], isActive: true },
  { _id: "100000000000000000000005", name: "maintenance", description: "Maintenance access", permissions: ["manage_maintenance"], isActive: true },
  { _id: "100000000000000000000006", name: "guest", description: "Guest portal access", permissions: ["manage_own_reservations"], isActive: true },
];
