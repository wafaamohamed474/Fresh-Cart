import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./shopCategoriesSlider.css";
const ShopCategoriesSlider = () => {
  const [allCategoris, setAllCategoris] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const DisplayAllCategoris = () => {
    useEffect(() => {
      fetch("https://ecommerce.routemisr.com/api/v1/categories")
        .then((response) => response.json())
        .then((data) => {
          setAllCategoris(data.data);
          
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);
  };
  DisplayAllCategoris();
  return (
    <div className="ShopCategoriesSlider">
      <div className="container">
        <h3>Shop Popular Categories</h3>
        <div className="row">
          <Slider {...settings}>
            {allCategoris.map((e) => (
              <div key={e._id} className="slider-item">
                <div className="Image-box">
                  <img src={e.image} alt={e.name} />
                </div>
                <span>{e.name}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ShopCategoriesSlider;
