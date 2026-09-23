import Hero from "../../components/user/Hero";
import BookingPanel from "../../components/user/BookingPanel";
import Introduction from "../../components/user/Introduction";
import FeaturedRooms from "../../components/user/FeaturedRooms";
import Services from "../../components/user/Services";
import ExperienceBanner from "../../components/user/ExperienceBanner";
import Testimonials from "../../components/user/Testimonials";
import FinalCTA from "../../components/user/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingPanel />
      <Introduction />
      <FeaturedRooms />
      <Services />
      <ExperienceBanner />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
