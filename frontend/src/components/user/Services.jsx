import { ConciergeBell, Sparkles, Utensils, Wifi, Wine, Flower2 } from "lucide-react";
import { services } from "../../data/content";

const icons = {
  dining: Utensils,
  "room-service": Wine,
  spa: Flower2,
  housekeeping: Sparkles,
  concierge: ConciergeBell,
  wifi: Wifi,
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-site">
        <div className="max-w-xl">
          <p className="eyebrow">Amenities</p>
          <h2 className="heading-display mt-4 text-[36px] md:text-[46px]">
            Service that stays in the background.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.id];
            return (
              <article key={service.id} className="border-t border-charcoal/10 pt-7">
                <Icon size={22} strokeWidth={1.3} className="text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-[24px] font-medium text-charcoal">{service.title}</h3>
                <p className="mt-3 text-[14px] font-light leading-relaxed text-muted">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
