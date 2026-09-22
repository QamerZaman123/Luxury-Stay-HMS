import { ChevronDown } from "lucide-react";
import { images } from "../data/content";

export default function Hero() {
  return (
    <section id="home" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      <img
        src={images.hero}
        alt="LuxuryStay hotel facade at dusk"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/35 to-charcoal/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
          Welcome to LuxuryStay
        </p>
        <h1 className="max-w-[18ch] font-serif text-[44px] font-medium leading-[1.08] text-white sm:text-[60px] md:text-[76px] lg:text-[88px]">
          Stay somewhere worth remembering.
        </h1>
        <p className="mt-7 max-w-xl text-[16px] font-light leading-relaxed text-white/85 md:text-[17px]">
          Thoughtfully designed rooms, exceptional service, and a stay built around you.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#rooms" className="btn-outline min-w-[180px]">
            Explore Rooms
          </a>
          <a href="#booking" className="btn-primary min-w-[180px]">
            Book Your Stay
          </a>
        </div>
      </div>

      <a
        href="#booking"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
        aria-label="Scroll to booking"
      >
        <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <ChevronDown size={18} strokeWidth={1.4} className="animate-bounce" />
      </a>
    </section>
  );
}
