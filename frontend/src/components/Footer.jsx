import { Instagram, Facebook, Mail } from "lucide-react";
import { navLinks } from "../data/content";

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-ivory">
      <div className="container-site grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div className="lg:col-span-2">
          <a href="#home" className="font-serif text-[22px] font-semibold tracking-[0.22em] uppercase">
            LuxuryStay
          </a>
          <p className="mt-5 max-w-sm text-[14px] font-light leading-relaxed text-white/60">
            A modern hospitality house for guests who value quiet luxury, considered design,
            and service that feels personal.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Navigate</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Contact</p>
          <address className="mt-5 not-italic text-[13px] font-light leading-relaxed text-white/70">
            18 Orchard Lane
            <br />
            Mayfair, London W1K
            <br />
            <a href="tel:+442071234567" className="mt-3 block transition-colors hover:text-white">
              +44 20 7123 4567
            </a>
            <a href="mailto:stay@luxurystay.com" className="block transition-colors hover:text-white">
              stay@luxurystay.com
            </a>
          </address>
          <div className="mt-6 flex items-center gap-4">
            <a href="#contact" aria-label="Instagram" className="text-white/70 transition-colors hover:text-gold">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#contact" aria-label="Facebook" className="text-white/70 transition-colors hover:text-gold">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="mailto:stay@luxurystay.com" aria-label="Email" className="text-white/70 transition-colors hover:text-gold">
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-3 py-6 text-[12px] text-white/40 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} LuxuryStay Hospitality. All rights reserved.</p>
          <p>Crafted for memorable stays.</p>
        </div>
      </div>
    </footer>
  );
}
