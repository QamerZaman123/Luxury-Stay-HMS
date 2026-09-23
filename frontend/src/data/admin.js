export const adminUser = {
  name: "Amelia Hart",
  role: "General Manager",
  email: "amelia.hart@luxurystay.com",
  initials: "AH",
};

export const dashboardStats = [
  { id: "rooms", label: "Total Rooms", value: "48", trend: "+2 this month", trendUp: true, icon: "Building2" },
  { id: "available", label: "Available Rooms", value: "19", trend: "40% occupancy free", trendUp: true, icon: "DoorOpen" },
  { id: "reservations", label: "Active Reservations", value: "27", trend: "+5 vs yesterday", trendUp: true, icon: "CalendarCheck" },
  { id: "checkins", label: "Today's Check-ins", value: "8", trend: "3 arriving soon", trendUp: true, icon: "LogIn" },
  { id: "checkouts", label: "Today's Check-outs", value: "6", trend: "2 pending", trendUp: false, icon: "LogOut" },
  { id: "revenue", label: "Revenue (MTD)", value: "$186,420", trend: "+12.4%", trendUp: true, icon: "Banknote" },
];

export const occupancySeries = [
  { day: "Mon", occupancy: 62 },
  { day: "Tue", occupancy: 68 },
  { day: "Wed", occupancy: 71 },
  { day: "Thu", occupancy: 74 },
  { day: "Fri", occupancy: 86 },
  { day: "Sat", occupancy: 94 },
  { day: "Sun", occupancy: 81 },
];

export const roomStatusCounts = [
  { status: "Available", count: 19, tone: "available" },
  { status: "Occupied", count: 18, tone: "occupied" },
  { status: "Reserved", count: 7, tone: "reserved" },
  { status: "Cleaning", count: 3, tone: "cleaning" },
  { status: "Maintenance", count: 1, tone: "maintenance" },
];

export const upcomingCheckIns = [
  { id: "CI-01", guest: "Elena Moreau", room: "412 · Executive Suite", date: "Today, 14:00", status: "Confirmed" },
  { id: "CI-02", guest: "James Whitfield", room: "208 · Deluxe King", date: "Today, 15:30", status: "Confirmed" },
  { id: "CI-03", guest: "Amara Chen", room: "501 · Presidential Suite", date: "Today, 16:00", status: "Pending" },
  { id: "CI-04", guest: "Luca Bianchi", room: "114 · Deluxe King", date: "Tomorrow, 13:00", status: "Confirmed" },
];

export const upcomingCheckOuts = [
  { id: "CO-01", guest: "Sofia Alvarez", room: "305 · Executive Suite", date: "Today, 11:00", status: "Checked In" },
  { id: "CO-02", guest: "Noah Patel", room: "221 · Deluxe King", date: "Today, 12:00", status: "Checked In" },
  { id: "CO-03", guest: "Claire Dubois", room: "118 · Deluxe King", date: "Tomorrow, 10:00", status: "Checked In" },
];

export const recentActivity = [
  { id: 1, type: "reservation", text: "New reservation created for Elena Moreau — Executive Suite 412", time: "12 min ago" },
  { id: 2, type: "checkin", text: "Sofia Alvarez checked in to Executive Suite 305", time: "38 min ago" },
  { id: 3, type: "housekeeping", text: "Room 221 marked for cleaning after checkout", time: "1 hr ago" },
  { id: 4, type: "payment", text: "Payment of $1,620 received for invoice INV-2048", time: "2 hr ago" },
  { id: 5, type: "maintenance", text: "Maintenance request created for Room 118 — AC noise", time: "3 hr ago" },
];

export const rooms = [
  { id: "R-208", name: "208", type: "Deluxe King", floor: 2, status: "Occupied", price: 320, guest: "James Whitfield" },
  { id: "R-114", name: "114", type: "Deluxe King", floor: 1, status: "Reserved", price: 320, guest: "Luca Bianchi" },
  { id: "R-221", name: "221", type: "Deluxe King", floor: 2, status: "Cleaning", price: 320, guest: "—" },
  { id: "R-118", name: "118", type: "Deluxe King", floor: 1, status: "Maintenance", price: 320, guest: "—" },
  { id: "R-305", name: "305", type: "Executive Suite", floor: 3, status: "Occupied", price: 540, guest: "Sofia Alvarez" },
  { id: "R-412", name: "412", type: "Executive Suite", floor: 4, status: "Reserved", price: 540, guest: "Elena Moreau" },
  { id: "R-318", name: "318", type: "Executive Suite", floor: 3, status: "Available", price: 540, guest: "—" },
  { id: "R-501", name: "501", type: "Presidential Suite", floor: 5, status: "Reserved", price: 980, guest: "Amara Chen" },
  { id: "R-102", name: "102", type: "Deluxe King", floor: 1, status: "Available", price: 320, guest: "—" },
  { id: "R-210", name: "210", type: "Deluxe King", floor: 2, status: "Available", price: 320, guest: "—" },
  { id: "R-401", name: "401", type: "Executive Suite", floor: 4, status: "Occupied", price: 540, guest: "Noah Patel" },
  { id: "R-506", name: "506", type: "Presidential Suite", floor: 5, status: "Available", price: 980, guest: "—" },
];

export const roomTypes = [
  {
    id: "RT-01",
    name: "Deluxe King",
    description: "Quiet king room with courtyard light, marble bath, and tailored linens.",
    capacity: 2,
    price: 320,
    rooms: 28,
    amenities: ["King bed", "Rain shower", "Work desk", "City view"],
    status: "Active",
  },
  {
    id: "RT-02",
    name: "Executive Suite",
    description: "Separate living room, writing desk, and floor-to-ceiling windows.",
    capacity: 3,
    price: 540,
    rooms: 14,
    amenities: ["Living room", "King bed", "Nespresso", "Bathtub"],
    status: "Active",
  },
  {
    id: "RT-03",
    name: "Presidential Suite",
    description: "Private residence with dining space, soaking tub, and city views.",
    capacity: 4,
    price: 980,
    rooms: 6,
    amenities: ["Dining", "Butler service", "Terrace", "Dual bath"],
    status: "Active",
  },
];

export const reservations = [
  { id: "RSV-1842", guest: "Elena Moreau", room: "412 · Executive Suite", checkIn: "23 Sep 2026", checkOut: "27 Sep 2026", guests: 2, status: "Confirmed", payment: "Paid" },
  { id: "RSV-1841", guest: "James Whitfield", room: "208 · Deluxe King", checkIn: "23 Sep 2026", checkOut: "25 Sep 2026", guests: 1, status: "Checked In", payment: "Paid" },
  { id: "RSV-1839", guest: "Amara Chen", room: "501 · Presidential Suite", checkIn: "23 Sep 2026", checkOut: "30 Sep 2026", guests: 3, status: "Pending", payment: "Unpaid" },
  { id: "RSV-1834", guest: "Sofia Alvarez", room: "305 · Executive Suite", checkIn: "20 Sep 2026", checkOut: "23 Sep 2026", guests: 2, status: "Checked In", payment: "Paid" },
  { id: "RSV-1828", guest: "Luca Bianchi", room: "114 · Deluxe King", checkIn: "24 Sep 2026", checkOut: "26 Sep 2026", guests: 2, status: "Confirmed", payment: "Partial" },
  { id: "RSV-1821", guest: "Claire Dubois", room: "118 · Deluxe King", checkIn: "18 Sep 2026", checkOut: "24 Sep 2026", guests: 1, status: "Checked In", payment: "Paid" },
  { id: "RSV-1814", guest: "Noah Patel", room: "401 · Executive Suite", checkIn: "21 Sep 2026", checkOut: "24 Sep 2026", guests: 2, status: "Checked Out", payment: "Paid" },
  { id: "RSV-1802", guest: "Hannah Brooks", room: "210 · Deluxe King", checkIn: "15 Sep 2026", checkOut: "17 Sep 2026", guests: 2, status: "Cancelled", payment: "Refunded" },
];

export const stays = [
  { id: "ST-305", guest: "Sofia Alvarez", room: "305 · Executive Suite", checkIn: "20 Sep 2026", expectedOut: "23 Sep 2026", actualOut: "—", status: "In House" },
  { id: "ST-208", guest: "James Whitfield", room: "208 · Deluxe King", checkIn: "23 Sep 2026", expectedOut: "25 Sep 2026", actualOut: "—", status: "In House" },
  { id: "ST-118", guest: "Claire Dubois", room: "118 · Deluxe King", checkIn: "18 Sep 2026", expectedOut: "24 Sep 2026", actualOut: "—", status: "In House" },
  { id: "ST-401", guest: "Noah Patel", room: "401 · Executive Suite", checkIn: "21 Sep 2026", expectedOut: "24 Sep 2026", actualOut: "23 Sep 2026", status: "Checked Out" },
  { id: "ST-102", guest: "Hannah Brooks", room: "210 · Deluxe King", checkIn: "15 Sep 2026", expectedOut: "17 Sep 2026", actualOut: "16 Sep 2026", status: "Checked Out" },
];

export const guests = [
  { id: "G-01", name: "Elena Moreau", email: "elena.moreau@email.com", phone: "+33 6 12 44 90 21", bookings: 4, stay: "Arriving today", status: "VIP" },
  { id: "G-02", name: "James Whitfield", email: "j.whitfield@email.com", phone: "+44 7700 900112", bookings: 2, stay: "Room 208", status: "In House" },
  { id: "G-03", name: "Amara Chen", email: "amara.chen@email.com", phone: "+65 8123 4455", bookings: 6, stay: "Arriving today", status: "VIP" },
  { id: "G-04", name: "Sofia Alvarez", email: "sofia.alvarez@email.com", phone: "+34 612 883 441", bookings: 3, stay: "Room 305", status: "In House" },
  { id: "G-05", name: "Luca Bianchi", email: "luca.bianchi@email.com", phone: "+39 347 221 0091", bookings: 1, stay: "Upcoming", status: "Active" },
  { id: "G-06", name: "Claire Dubois", email: "claire.dubois@email.com", phone: "+33 7 88 12 33 09", bookings: 5, stay: "Room 118", status: "In House" },
  { id: "G-07", name: "Noah Patel", email: "noah.patel@email.com", phone: "+1 415 555 0198", bookings: 2, stay: "Checked out", status: "Active" },
  { id: "G-08", name: "Hannah Brooks", email: "hannah.brooks@email.com", phone: "+44 7700 441290", bookings: 1, stay: "—", status: "Inactive" },
];

export const staff = [
  { id: "S-01", name: "Amelia Hart", role: "Manager", email: "amelia.hart@luxurystay.com", phone: "+44 20 7123 4501", department: "Front Office", status: "Active", joined: "12 Jan 2019" },
  { id: "S-02", name: "Daniel Okonkwo", role: "Receptionist", email: "daniel.okonkwo@luxurystay.com", phone: "+44 20 7123 4502", department: "Front Office", status: "Active", joined: "03 Mar 2022" },
  { id: "S-03", name: "Mei Lin", role: "Housekeeping", email: "mei.lin@luxurystay.com", phone: "+44 20 7123 4503", department: "Housekeeping", status: "Active", joined: "18 Jun 2021" },
  { id: "S-04", name: "Thomas Reed", role: "Maintenance", email: "thomas.reed@luxurystay.com", phone: "+44 20 7123 4504", department: "Engineering", status: "Active", joined: "09 Sep 2020" },
  { id: "S-05", name: "Priya Shah", role: "Receptionist", email: "priya.shah@luxurystay.com", phone: "+44 20 7123 4505", department: "Front Office", status: "Active", joined: "22 Feb 2024" },
  { id: "S-06", name: "Owen Clarke", role: "Housekeeping", email: "owen.clarke@luxurystay.com", phone: "+44 20 7123 4506", department: "Housekeeping", status: "Inactive", joined: "14 Nov 2018" },
];

export const invoices = [
  { id: "INV-2048", guest: "Elena Moreau", reservation: "RSV-1842", amount: 2160, issue: "20 Sep 2026", due: "23 Sep 2026", status: "Paid" },
  { id: "INV-2047", guest: "James Whitfield", reservation: "RSV-1841", amount: 640, issue: "21 Sep 2026", due: "23 Sep 2026", status: "Paid" },
  { id: "INV-2046", guest: "Amara Chen", reservation: "RSV-1839", amount: 6860, issue: "22 Sep 2026", due: "23 Sep 2026", status: "Overdue" },
  { id: "INV-2044", guest: "Sofia Alvarez", reservation: "RSV-1834", amount: 1620, issue: "18 Sep 2026", due: "20 Sep 2026", status: "Paid" },
  { id: "INV-2041", guest: "Luca Bianchi", reservation: "RSV-1828", amount: 640, issue: "22 Sep 2026", due: "24 Sep 2026", status: "Partial" },
  { id: "INV-2036", guest: "Hannah Brooks", reservation: "RSV-1802", amount: 640, issue: "12 Sep 2026", due: "15 Sep 2026", status: "Refunded" },
];

export const payments = [
  { id: "PAY-9102", guest: "Elena Moreau", invoice: "INV-2048", amount: 2160, method: "Card", date: "20 Sep 2026", status: "Completed" },
  { id: "PAY-9101", guest: "James Whitfield", invoice: "INV-2047", amount: 640, method: "Card", date: "21 Sep 2026", status: "Completed" },
  { id: "PAY-9098", guest: "Sofia Alvarez", invoice: "INV-2044", amount: 1620, method: "Bank transfer", date: "18 Sep 2026", status: "Completed" },
  { id: "PAY-9094", guest: "Luca Bianchi", invoice: "INV-2041", amount: 320, method: "Card", date: "22 Sep 2026", status: "Completed" },
  { id: "PAY-9088", guest: "Hannah Brooks", invoice: "INV-2036", amount: 640, method: "Card", date: "16 Sep 2026", status: "Refunded" },
];

export const hotelServices = [
  { id: "SV-01", name: "Room Service", description: "In-room dining from 06:00 to 23:00.", price: 0, unit: "Menu pricing", available: true },
  { id: "SV-02", name: "Laundry", description: "Same-day press and overnight laundry.", price: 28, unit: "per item from", available: true },
  { id: "SV-03", name: "Spa", description: "Massage, steam, and rest treatments.", price: 160, unit: "from", available: true },
  { id: "SV-04", name: "Restaurant", description: "Seasonal tasting and a la carte dining.", price: 85, unit: "from", available: true },
  { id: "SV-05", name: "Transportation", description: "Airport transfers and city cars.", price: 95, unit: "one way", available: false },
];

export const serviceOrders = [
  { id: "SO-441", guest: "Sofia Alvarez", service: "Room Service", qty: 1, amount: 86, status: "Delivered", date: "23 Sep 2026" },
  { id: "SO-440", guest: "James Whitfield", service: "Laundry", qty: 3, amount: 84, status: "In Progress", date: "23 Sep 2026" },
  { id: "SO-438", guest: "Claire Dubois", service: "Spa", qty: 1, amount: 220, status: "Confirmed", date: "22 Sep 2026" },
  { id: "SO-435", guest: "Noah Patel", service: "Restaurant", qty: 2, amount: 214, status: "Completed", date: "22 Sep 2026" },
  { id: "SO-429", guest: "Elena Moreau", service: "Transportation", qty: 1, amount: 95, status: "Pending", date: "23 Sep 2026" },
];

export const housekeepingTasks = [
  { id: "HK-12", room: "221", type: "Deluxe King", task: "Departure clean", staff: "Mei Lin", priority: "High", status: "In Progress", updated: "10:42" },
  { id: "HK-11", room: "102", type: "Deluxe King", task: "Stay-over service", staff: "Owen Clarke", priority: "Medium", status: "Pending", updated: "09:15" },
  { id: "HK-10", room: "318", type: "Executive Suite", task: "Turndown", staff: "Mei Lin", priority: "Low", status: "Completed", updated: "08:50" },
  { id: "HK-09", room: "210", type: "Deluxe King", task: "Deep clean", staff: "Unassigned", priority: "Medium", status: "Pending", updated: "Yesterday" },
  { id: "HK-08", room: "506", type: "Presidential Suite", task: "Arrival prep", staff: "Mei Lin", priority: "High", status: "Completed", updated: "Yesterday" },
];

export const maintenanceRequests = [
  { id: "MT-77", room: "118", issue: "Air conditioning noise", priority: "High", staff: "Thomas Reed", status: "In Progress", created: "22 Sep 2026" },
  { id: "MT-74", room: "305", issue: "Bathroom light flicker", priority: "Medium", staff: "Thomas Reed", status: "Reported", created: "23 Sep 2026" },
  { id: "MT-71", room: "501", issue: "Terrace door latch", priority: "Low", staff: "Unassigned", status: "Reported", created: "21 Sep 2026" },
  { id: "MT-68", room: "208", issue: "Minibar cooling", priority: "Medium", staff: "Thomas Reed", status: "Resolved", created: "19 Sep 2026" },
];

export const feedback = [
  { id: "FB-31", guest: "Sofia Alvarez", rating: 5, comment: "Quiet, considered, and the staff never rushed us. We will return.", stay: "ST-305", date: "22 Sep 2026", status: "Published" },
  { id: "FB-29", guest: "Noah Patel", rating: 4, comment: "Beautiful suite. Breakfast was excellent; check-out took a little long.", stay: "ST-401", date: "23 Sep 2026", status: "Reviewed" },
  { id: "FB-27", guest: "Hannah Brooks", rating: 3, comment: "Room was lovely but the street noise was noticeable overnight.", stay: "ST-102", date: "17 Sep 2026", status: "Pending" },
  { id: "FB-24", guest: "Claire Dubois", rating: 5, comment: "The courtyard and linens alone would bring me back.", stay: "ST-118", date: "20 Sep 2026", status: "Published" },
];

export const notifications = [
  { id: "N-1", title: "Amara Chen arrives at 16:00", body: "Presidential Suite 501 — pending payment on INV-2046.", time: "20 min ago", read: false, group: "today", type: "reservation" },
  { id: "N-2", title: "Room 221 cleaning in progress", body: "Mei Lin started the departure clean.", time: "45 min ago", read: false, group: "today", type: "housekeeping" },
  { id: "N-3", title: "Payment received", body: "$1,620 recorded against INV-2044.", time: "2 hr ago", read: true, group: "today", type: "payment" },
  { id: "N-4", title: "Maintenance: Room 118", body: "AC noise assigned to Thomas Reed.", time: "Yesterday", read: true, group: "earlier", type: "maintenance" },
  { id: "N-5", title: "New guest feedback", body: "Noah Patel left a 4-star review.", time: "Yesterday", read: true, group: "earlier", type: "feedback" },
  { id: "N-6", title: "Low availability this weekend", body: "Saturday occupancy forecast is 94%.", time: "2 days ago", read: true, group: "earlier", type: "system" },
];
