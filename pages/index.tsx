import Contact from "@/components/landing/Contact";
import Features from "@/components/landing/Features";
import Features2 from "@/components/landing/Features2";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";

function Landing() {
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Features2/>
      <Contact />
    </div>
  );
}

export default Landing;
