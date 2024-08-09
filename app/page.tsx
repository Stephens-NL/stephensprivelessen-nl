'use client';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Hero from "../components/Hero";
import ServicesShort from "@/components/ServicesShort";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <>
      <Hero />
      <ServicesShort />

      <Testimonials /> 
    </>
  );
}
