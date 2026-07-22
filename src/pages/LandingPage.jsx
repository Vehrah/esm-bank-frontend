import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";

function LandingPage() {
  return (
    <div className="bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <Hero />
      <Features />
      <Services />
       <WhyChooseUs />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;