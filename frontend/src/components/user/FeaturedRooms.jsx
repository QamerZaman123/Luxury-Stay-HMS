import { rooms } from "../../data/content";
import RoomCard from "./RoomCard";

export default function FeaturedRooms() {
  return (
    <section id="rooms" className="bg-white py-24 md:py-32">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Accommodations</p>
          <h2 className="heading-display mt-4 text-[36px] md:text-[46px]">
            Rooms designed for your stay
          </h2>
          <p className="mt-5 text-[16px] font-light leading-relaxed text-muted">
            Three distinct rooms, each composed with the same attention to light, material, and rest.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
