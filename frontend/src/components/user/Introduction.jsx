import { images } from "../../data/content";

export default function Introduction() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">The LuxuryStay Experience</p>
          <h2 className="heading-display mt-5 text-[36px] md:text-[46px]">
            Where comfort meets thoughtful hospitality.
          </h2>
          <div className="mt-8 h-px w-12 bg-gold" />
          <p className="mt-8 text-[16px] font-light leading-[1.8] text-muted">
            LuxuryStay is a modern hospitality house built around quiet luxury. Rooms are
            composed with natural materials, generous light, and a calm that stays with you.
            Service is attentive without ceremony — the kind of care that feels personal,
            never performed.
          </p>
          <p className="mt-5 text-[16px] font-light leading-[1.8] text-muted">
            Whether you arrive for a single night or a longer residence, every stay is
            designed to be remembered for how it felt.
          </p>
          <a href="#experience" className="btn-outline-dark mt-10">
            Discover LuxuryStay
          </a>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:ml-10">
            <img
              src={images.intro}
              alt="Sunlit hotel lobby with marble floors and tall windows"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-0 hidden border border-gold/40 bg-ivory px-7 py-5 lg:block">
            <p className="font-serif text-[32px] leading-none text-charcoal">12</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Years of hospitality</p>
          </div>
        </div>
      </div>
    </section>
  );
}
