import Features from "../components/LandingPageComponents/Features";
import HeroSection from "../components/LandingPageComponents/HeroSection";
import Navbar from "../components/LandingPageComponents/Navbar";
import TicketRail from "../components/LandingPageComponents/TicketRail";
import { landingPageStyles } from "../styles/landingPage";

const LandingPage = () => {
  return (
    <div className={landingPageStyles.landingPageDiv}>
      <Navbar />
      <HeroSection />
      <TicketRail />
      <Features />
    </div>
  )
}

export default LandingPage
