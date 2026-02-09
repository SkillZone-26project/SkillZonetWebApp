import React from "react";
import Nav from "../../Components/Nav/Nav"
import Hero from "../../Components/Hero/Hero";
import Choose from "../../Components/Choose/Choose"
import HowItWorks from "../../Components/HowItWorks/HowItWorks"
import Ready from "../../Components/Ready/Ready"
import Footer from "../../Components/Footer/Footer"

function Home() {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Nav />
      <Hero />
      <Choose />
      <HowItWorks />
      <Ready />
      <Footer /> 
    </div>
  );
}

export default Home;
