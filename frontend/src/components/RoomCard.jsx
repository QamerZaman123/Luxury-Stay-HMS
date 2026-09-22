import { ArrowUpRight } from "lucide-react";

export default function RoomCard({ room }) {
  return (
    <article className="group">
      <a href={`#${room.id}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-charcoal/55 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white">View Room</span>
            <ArrowUpRight size={16} className="text-white" strokeWidth={1.5} />
          </div>
        </div>
        <div className="pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-[28px] font-medium text-charcoal">{room.name}</h3>
            <p className="shrink-0 text-[13px] text-muted">
              from <span className="font-medium text-charcoal">${room.price}</span>
            </p>
          </div>
          <p className="mt-3 text-[14px] font-light leading-relaxed text-muted">{room.description}</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-charcoal/55">
            {room.guests} guests · {room.bed} · {room.size}
          </p>
        </div>
      </a>
    </article>
  );
}
