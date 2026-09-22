import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingPanel from "./components/BookingPanel";
import Introduction from "./components/Introduction";
import FeaturedRooms from "./components/FeaturedRooms";
import Services from "./components/Services";
import ExperienceBanner from "./components/ExperienceBanner";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BookingPanel />
        <Introduction />
        <FeaturedRooms />
        <Services />
        <ExperienceBanner />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
