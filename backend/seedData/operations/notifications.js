module.exports = [
  { _id: "120000000000000000000001", recipient: "200000000000000000000003", hotel: "500000000000000000000001", type: "reservation", title: "New reservation", message: "A pending reservation requires review.", relatedEntity: { type: "Reservation", id: "800000000000000000000001" }, isRead: false, readAt: null },
  { _id: "120000000000000000000002", recipient: "200000000000000000000004", hotel: "500000000000000000000001", type: "housekeeping", title: "Cleaning assigned", message: "Room 103 has been assigned to you.", relatedEntity: { type: "HousekeepingTask", id: "e00000000000000000000002" }, isRead: true, readAt: new Date("2026-09-17T09:05:00") },
  { _id: "120000000000000000000003", recipient: "200000000000000000000005", hotel: "500000000000000000000002", type: "maintenance", title: "Urgent maintenance", message: "AC repair is in progress in room 201.", relatedEntity: { type: "MaintenanceRequest", id: "f00000000000000000000003" }, isRead: false, readAt: null },
];
