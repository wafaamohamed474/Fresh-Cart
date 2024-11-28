import React from "react";
import Slider from "../../components/slider/Slider";
import ShopCategoriesSlider from "../../components/ShopCategoriesSlider/ShopCategoriesSlider";
const Home = () => {
  return (
    <div className="home pTB">
      <Slider />
      <ShopCategoriesSlider />
    </div>
  );
};

export default Home;
