export default function FinalCTA() {
  return (
    <section className="border-y border-charcoal/8 py-24 md:py-32">
      <div className="container-site text-center">
        <p className="eyebrow">Reservations</p>
        <h2 className="heading-display mx-auto mt-5 max-w-[16ch] text-[42px] md:text-[64px]">
          Your stay starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] font-light leading-relaxed text-muted">
          Reserve a room directly with LuxuryStay. We keep a limited number of rooms for
          guests who book with us.
        </p>
        <a href="#booking" className="btn-primary mt-10">
          Book Your Stay
        </a>
      </div>
    </section>
  );
}
