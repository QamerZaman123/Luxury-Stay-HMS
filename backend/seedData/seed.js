const mongoose = require("mongoose");
const connectDB = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();

const Role = require("../models/identity/Role");
const User = require("../models/identity/User");
const GuestProfile = require("../models/identity/GuestProfile");
const StaffProfile = require("../models/identity/StaffProfile");
const Hotel = require("../models/hotel/Hotel");
const RoomType = require("../models/hotel/RoomType");
const Room = require("../models/hotel/Room");
const Reservation = require("../models/reservations/Reservation");
const Stay = require("../models/reservations/Stay");
const Service = require("../models/services/Service");
const ServiceOrder = require("../models/services/ServiceOrder");
const Invoice = require("../models/billing/Invoice");
const Payment = require("../models/billing/Payment");
const HousekeepingTask = require("../models/operations/HousekeepingTask");
const MaintenanceRequest = require("../models/operations/MaintenanceRequest");
const Feedback = require("../models/communication/Feedback");
const Notification = require("../models/communication/Notification");
const SystemSetting = require("../models/hotel/SystemSetting");

const roles = require("./auth/roles");
const users = require("./auth/users");
const staffProfiles = require("./staff/staffProfiles");
const guestProfiles = require("./staff/guestProfiles");
const hotels = require("./hotel/hotels");
const roomTypes = require("./hotel/roomTypes");
const rooms = require("./hotel/rooms");
const reservations = require("./reservation/reservations");
const stays = require("./reservation/stays");
const services = require("./billing/services");
const serviceOrders = require("./billing/serviceOrders");
const invoices = require("./billing/invoices");
const payments = require("./billing/payments");
const housekeepingTasks = require("./operations/housekeepingTasks");
const maintenanceRequests = require("./operations/maintenanceRequests");
const feedback = require("./operations/feedback");
const notifications = require("./operations/notifications");
const systemSettings = require("./operations/systemSettings");

const models = [
  Role,
  User,
  GuestProfile,
  StaffProfile,
  Hotel,
  RoomType,
  Room,
  Reservation,
  Stay,
  Service,
  ServiceOrder,
  Invoice,
  Payment,
  HousekeepingTask,
  MaintenanceRequest,
  Feedback,
  Notification,
  SystemSetting,
];

const idMap = new Map();

const getGeneratedId = (seedId) => {
  if (seedId === null || seedId === undefined) return seedId;

  const generatedId = idMap.get(String(seedId));
  if (!generatedId) {
    throw new Error(`Missing generated ID for seed reference: ${seedId}`);
  }

  return generatedId;
};

const seedCollection = async (Model, seedData, referenceFields = []) => {
  const documents = seedData.map(({ _id: seedId, ...document }) => {
    referenceFields.forEach((field) => {
      if (field === "relatedEntity.id") {
        if (document.relatedEntity?.id) {
          document.relatedEntity.id = getGeneratedId(document.relatedEntity.id);
        }
        return;
      }

      if (document[field] !== null && document[field] !== undefined) {
        document[field] = getGeneratedId(document[field]);
      }
    });

    return document;
  });

  const createdDocuments = await Model.insertMany(documents);

  seedData.forEach((document, index) => {
    idMap.set(String(document._id), createdDocuments[index]._id);
  });
};

const seedDatabase = async () => {
  await connectDB();

  try {
    await Promise.all(models.map((Model) => Model.deleteMany({})));

    await seedCollection(Role, roles);
    await seedCollection(Hotel, hotels);
    await seedCollection(User, users, ["role"]);
    await seedCollection(GuestProfile, guestProfiles, ["user"]);
    await seedCollection(StaffProfile, staffProfiles, ["user"]);
    await seedCollection(RoomType, roomTypes, ["hotel"]);
    await seedCollection(Room, rooms, ["hotel", "roomType", "currentGuest"]);
    await seedCollection(Reservation, reservations, ["hotel", "guest", "room", "roomType", "createdBy"]);
    await seedCollection(Stay, stays, ["reservation", "guest", "room", "checkedInBy", "checkedOutBy"]);
    await seedCollection(Service, services, ["hotel"]);
    await seedCollection(ServiceOrder, serviceOrders, ["hotel", "guest", "stay", "room", "service"]);
    await seedCollection(Invoice, invoices, ["hotel", "guest", "stay", "reservation"]);
    await seedCollection(Payment, payments, ["invoice", "hotel", "guest", "processedBy"]);
    await seedCollection(HousekeepingTask, housekeepingTasks, ["hotel", "room", "assignedTo"]);
    await seedCollection(MaintenanceRequest, maintenanceRequests, ["hotel", "room", "reportedBy", "assignedTo"]);
    await seedCollection(Feedback, feedback, ["hotel", "guest", "reservation", "room"]);
    await seedCollection(Notification, notifications, ["recipient", "hotel", "relatedEntity.id"]);
    await seedCollection(SystemSetting, systemSettings, ["hotel", "updatedBy"]);

    console.log("Seed data inserted successfully.");
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase().catch((error) => {
  console.error(`Seeding failed: ${error.message}`);
  process.exitCode = 1;
});
