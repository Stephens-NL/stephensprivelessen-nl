// app/page.tsx
import Hero3 from "../components/Hero";

import Services from "@/components/Services";
import ServicesShort from "@/components/ServicesShort";
import Testimonials from "@/components/Testimonials";
// import { useState } from "react";

// const [language, setLanguage] = useState<'EN' | 'NL'>('NL');

export default function Home() {
  return (
    <>
      <Hero3 />
      <ServicesShort />

      <Testimonials /> 
    </>
  );
}