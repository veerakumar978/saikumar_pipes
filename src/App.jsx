import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import AboutUs from './components/AboutUs';
import ProductCategories from './components/ProductCategories';
import OurBrands from './components/OurBrands';
import WhyChooseUs from './components/WhyChooseUs';
import OurStore from './components/OurStore';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#263746]">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <AboutUs />
          <ProductCategories />
          <OurBrands />
          <WhyChooseUs />
          <OurStore />
          <ContactUs />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
