import React from "react";
import Nav from "../../Components/Nav/Nav"
import Hero from "../../Components/Hero/Hero";
// import MainBody from "./MainBody";
// import Footer from "./Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Nav />
      <Hero />
      {/* <MainBody />
      <Footer /> */}
    </div>
  );
}

export default Home;
