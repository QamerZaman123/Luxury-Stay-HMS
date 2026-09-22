export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const roomTypes = ["Any Room", "Deluxe King", "Executive Suite", "Presidential Suite"];

export const rooms = [
  {
    id: "deluxe-king",
    name: "Deluxe King",
    description:
      "A quiet, light-filled room with a king bed, tailored linens, and a marble bath overlooking the courtyard.",
    guests: 2,
    bed: "King bed",
    size: "42 m\u00b2",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description:
      "A generous suite with a separate living room, writing desk, and floor-to-ceiling windows for longer stays.",
    guests: 3,
    bed: "King + sofa",
    size: "68 m\u00b2",
    price: 540,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    description:
      "Our most private residence: a full living suite, dining space, and a soaking tub with city views.",
    guests: 4,
    bed: "King + twin",
    size: "110 m\u00b2",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
  },
];

export const services = [
  {
    id: "dining",
    title: "Fine Dining",
    description: "Seasonal menus prepared with local produce in a quiet, candlelit dining room.",
  },
  {
    id: "room-service",
    title: "Room Service",
    description: "Thoughtful in-room dining from early breakfast through late evening.",
  },
  {
    id: "spa",
    title: "Wellness & Spa",
    description: "A calm spa with steam, massage, and treatments designed around rest.",
  },
  {
    id: "housekeeping",
    title: "Housekeeping",
    description: "Twice-daily service with turndown, fresh linens, and discreet attention.",
  },
  {
    id: "concierge",
    title: "Concierge",
    description: "Reservations, itineraries, and local introductions arranged with care.",
  },
  {
    id: "wifi",
    title: "Complimentary Wi-Fi",
    description: "Reliable high-speed internet throughout the hotel and residences.",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Every detail felt considered. The room was quiet, the staff unhurried, and we left feeling genuinely rested.",
    name: "Elena Moreau",
    location: "Paris",
  },
  {
    id: 2,
    quote:
      "A rare hotel that still feels personal. Breakfast in the courtyard and a bed we still talk about.",
    name: "James Whitfield",
    location: "London",
  },
  {
    id: 3,
    quote:
      "We booked for one night and stayed three. LuxuryStay understands what a stay should feel like.",
    name: "Amara Chen",
    location: "Singapore",
  },
];

export const images = {
  hero: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
  intro: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  experience: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80",
};
