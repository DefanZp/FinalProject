import React from "react";
import CardsNow from "../../components/CardsNow/CardsNow";
import CardsPopular from "../../components/CardsPopular/CardsPopular";
import CardsUpcoming from "../../components/CardsUpcoming/CardsUpcoming";
import ForYou from "../../components/ForYou/ForYou";
import Mega from "../../components/Mega/Mega";
import MegaSlider from "../../components/MegaSlider/MegaSlider";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const HomeView = () => {
  return (
    <>
    <Navbar />
    {/* <Mega /> */}
    <MegaSlider />
    <section id="body" className=" px-6 lg:mx-28">
      <div className="container mx-auto">
      <ForYou />  
      <CardsNow />
      <CardsPopular />
      <CardsUpcoming />
      </div>
    </section>
    <Footer />
    </>
  );
};

export default HomeView;
