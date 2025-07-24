import Hero from "../components/Hero";
import ServicesShort from "@/components/ServicesShort";
import Testimonials from "@/components/Testimonials";
import Script from 'next/script';
import { websiteSchema } from '@/lib/structured-data';


export default function Home() {
  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <ServicesShort />
      <Testimonials /> 
    </>
  );
}
