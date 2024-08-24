"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import SecondSection from "./_components/SecondSection";
import ThirdSection from "./_components/ThirdSection";
import FourthSection from "./_components/FourthSection";
import FifthSection from "./_components/FifthSection";
import SixthSection from "./_components/SixthSection";
import ClosingSection from "./_components/ClosingSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}
