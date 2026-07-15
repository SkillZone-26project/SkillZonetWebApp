import React from "react";
import Nav from "../../Components/Nav/Nav"
import PowerfulFeatures from "./PowerfulFeatures";
import FeaturesCTA from "./FeaturesCTA";
import Footer from "../../Components/Footer/Footer"

function Features() {
  return (
    <div className="flex flex-col min-h-screen pt-[85px]">
      <Nav />
      <PowerfulFeatures />
      <FeaturesCTA />
      <Footer /> 
    </div>
  );
}


export default Features;