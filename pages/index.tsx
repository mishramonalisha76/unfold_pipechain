import Contact from "@/components/landing/Contact";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";

function Landing() {
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Contact />
    </div>
  );
}

export default Landing;
