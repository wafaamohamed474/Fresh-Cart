import React from "react";
import './emptyCart.css'

const EmptyCart = () => {
  return (
    <div className="emptyCart pTB">
      <div className="container">
        <div className="row row1">
          <div className="col-10 col-md-10 col-lg-8">
            <div className="emptyCartBox">
              <h2>Shop Cart</h2>
              <h3>Total Price : EGP 0.00</h3>
              <div className="items-count">
                <p>ITEMS</p>
                <p>COUNT</p>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-2">
                  <div className="imageBox">
                    <img
                      src="https://e-commerce-website-angular-tau.vercel.app/assets/images/6430781.webp"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-10">
                  <div className="left">
                    <div className="alertMsg">no products yet!</div>
                    <p>EGP 0.00</p>
                  </div>
                  <div className="right">
                    <button className="btn">-</button>
                    <span>0</span>
                    <button className="btn">+</button>
                  </div>
                </div>
              </div>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
