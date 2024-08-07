'use client';

// app/page.tsx
import Hero from "../components/Hero";
import ServicesShort from "@/components/ServicesShort";
import Testimonials from "@/components/Testimonials";
// import { useState } from "react";

// const [language, setLanguage] = useState<'EN' | 'NL'>('NL');

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesShort />

      <Testimonials /> 
    </>
  );
}