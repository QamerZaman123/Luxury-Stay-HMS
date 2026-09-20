const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// importing the routes
const authRoutes = require("./routes/auth/authRoutes");
const roleRoutes = require("./routes/auth/roleRoutes");
const userRoutes = require("./routes/auth/userRoutes");
const staffRoutes = require("./routes/staff/staffRoutes");
const guestProfileRoutes = require("./routes/staff/guestProfileRoutes");
const hotelRoutes = require("./routes/hotel/hotelRoutes");
const roomTypeRoutes = require("./routes/hotel/roomTypeRoutes");
const roomRoutes = require("./routes/hotel/roomRoutes");
const reservationRoutes = require("./routes/reservation/reservationRoutes");
const stayRoutes = require("./routes/reservation/stayRoutes");
const serviceRoutes = require("./routes/billing/serviceRoutes");
const serviceOrderRoutes = require("./routes/billing/serviceOrderRoutes");
const invoiceRoutes = require("./routes/billing/invoiceRoutes");
const paymentRoutes = require("./routes/billing/paymentRoutes");
const housekeepingRoutes = require("./routes/operations/housekeepingRoutes");
const maintenanceRoutes = require("./routes/operations/maintenanceRoutes");
const feedbackRoutes = require("./routes/operations/feedbackRoutes");
const notificationRoutes = require("./routes/operations/notificationRoutes");
const systemSettingRoutes = require("./routes/operations/systemSettingRoutes");
const reportRoutes = require("./routes/operations/reportRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Authentication, roles, and user management APIs
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);

// Staff and guest profile APIs
app.use("/api/staff", staffRoutes);
app.use("/api/guest-profiles", guestProfileRoutes);

// Hotel, room type, and room management APIs
app.use("/api/hotels", hotelRoutes);
app.use("/api/room-types", roomTypeRoutes);
app.use("/api/rooms", roomRoutes);

// Reservation and guest stay APIs
app.use("/api/reservations", reservationRoutes);
app.use("/api/stays", stayRoutes);

// Guest service, invoice, and payment APIs
app.use("/api/services", serviceRoutes);
app.use("/api/service-orders", serviceOrderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);

// Hotel operations and management APIs
app.use("/api/housekeeping", housekeepingRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/settings", systemSettingRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});