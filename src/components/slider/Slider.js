import React from "react";
import { Carousel } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
const Slider = () => {
  return (
    <div className="slider">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 col-md-9">
            <Carousel interval={1500}>
              <Carousel.Item>
                <img
                  src="https://e-commerce-website-angular-tau.vercel.app/assets/images/1.jpg"
                  alt=""
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  src="https://e-commerce-website-angular-tau.vercel.app/assets/images/2.gif"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://e-commerce-website-angular-tau.vercel.app/assets/images/3.png"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://e-commerce-website-angular-tau.vercel.app/assets/images/4.png"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://e-commerce-website-angular-tau.vercel.app/assets/images/5.png"
                  alt=""
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-12 col-md-3">
            <div className="row">
              <div className="col-12">
                <div className="Image-box">
                  <img
                    src="https://e-commerce-website-angular-tau.vercel.app/assets/images/main-slider-1.jpeg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="Image-box">
                  <img
                    src="https://e-commerce-website-angular-tau.vercel.app/assets/images/main-slider-3.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
