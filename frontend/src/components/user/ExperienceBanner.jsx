import { images } from "../../data/content";

export default function ExperienceBanner() {
  return (
    <section id="experience" className="relative min-h-[520px] overflow-hidden md:min-h-[620px]">
      <img
        src={images.experience}
        alt="Hotel pool terrace at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center md:min-h-[620px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">Hospitality</p>
        <h2 className="mt-6 font-serif text-[40px] font-medium leading-[1.1] text-white md:text-[56px]">
          More than a stay. An experience.
        </h2>
        <p className="mt-6 text-[16px] font-light leading-relaxed text-white/80">
          From the first greeting to the last morning coffee, LuxuryStay is composed around
          unhurried service, considered spaces, and the feeling of being looked after.
        </p>
        <a href="#about" className="btn-outline mt-10">
          Discover LuxuryStay
        </a>
      </div>
    </section>
  );
}
