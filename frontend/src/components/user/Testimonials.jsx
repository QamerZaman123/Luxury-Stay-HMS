import { testimonials } from "../../data/content";

export default function Testimonials() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-site">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Guest Notes</p>
          <h2 className="heading-display mt-4 text-[36px] md:text-[46px]">Words from recent stays</h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="flex flex-col">
              <span className="font-serif text-[48px] leading-none text-gold/70" aria-hidden="true">
                “
              </span>
              <p className="mt-2 font-serif text-[22px] font-normal leading-[1.45] text-charcoal">
                {item.quote}
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="block text-[13px] font-medium uppercase tracking-[0.14em] text-charcoal">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-[12px] text-muted">{item.location}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
