import React from "react";
import Nav from "../../Components/Nav/Nav"
import SupportHero from "./SupportHero";
import SupportContacts from "./SupportContacts";
import Footer from "../../Components/Footer/Footer"

function Support() {
  return (
    <div className="flex flex-col min-h-screen pt-[85px]">
      <Nav />
      <SupportHero />
      <SupportContacts />
      <Footer /> 
    </div>
  );
}


export default Support;


