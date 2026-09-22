import { useState } from "react";
import { roomTypes } from "../data/content";

const fieldClass =
  "w-full border-0 bg-transparent p-0 font-sans text-[15px] text-charcoal outline-none placeholder:text-muted/70";

export default function BookingPanel() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "Any Room",
  });
  const [message, setMessage] = useState("");

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setMessage("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.checkIn || !form.checkOut) {
      setMessage("Please select check-in and check-out dates.");
      return;
    }
    setMessage("Rooms are available for your dates. Our concierge will confirm shortly.");
  };

  return (
    <section id="booking" className="relative z-20 -mt-16 md:-mt-20">
      <div className="container-site">
        <form
          onSubmit={onSubmit}
          className="border border-charcoal/8 bg-white px-6 py-7 shadow-[0_24px_60px_rgba(23,23,23,0.08)] md:px-10 md:py-8"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Reservations</p>
              <h2 className="mt-1 font-serif text-[26px] font-medium text-charcoal md:text-[28px]">
                Check availability
              </h2>
            </div>
            <span className="hidden text-[12px] uppercase tracking-[0.14em] text-muted md:block">
              Direct booking
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
            <label className="flex flex-col gap-2 border-b border-charcoal/10 pb-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Check-in</span>
              <input
                type="date"
                value={form.checkIn}
                onChange={update("checkIn")}
                className={fieldClass}
                aria-label="Check-in date"
              />
            </label>
            <label className="flex flex-col gap-2 border-b border-charcoal/10 pb-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Check-out</span>
              <input
                type="date"
                value={form.checkOut}
                onChange={update("checkOut")}
                className={fieldClass}
                aria-label="Check-out date"
              />
            </label>
            <label className="flex flex-col gap-2 border-b border-charcoal/10 pb-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Guests</span>
              <select value={form.guests} onChange={update("guests")} className={fieldClass} aria-label="Number of guests">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 border-b border-charcoal/10 pb-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Room Type</span>
              <select
                value={form.roomType}
                onChange={update("roomType")}
                className={fieldClass}
                aria-label="Room type"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn-primary w-full lg:mb-[2px]">
              Check Availability
            </button>
          </div>

          {message ? (
            <p className="mt-5 text-[13px] leading-relaxed text-muted" role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
