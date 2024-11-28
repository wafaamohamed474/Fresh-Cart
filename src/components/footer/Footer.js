import React from "react";
import "./footer.css"
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footerContent">
            <h4>Get the FreshCart app</h4>
            <h6>
              We will send you a link, open it on your phone to download the
              app.
            </h6>
            <div className="row">
              <div className="col-12 col-md-10">
                <div className="input-form">
                  <input type="email" placeholder="Email.." name="email" />
                </div>
              </div>
              <div className="col-12 col-md-2 ">
                <button className="main-btn shareAppLink">Share App Link</button>
              </div>
            </div>
            <hr/>
            <div className="row payment-row">
              <div className="col-12 col-md-4">
                <div className="box">
                  <span>Payment Parteners</span>
                  <div>
                    <img
                      src="https://e-commerce-website-angular-tau.vercel.app/assets/images/visa-1.svg"
                      alt=""
                    />
                    <img
                      src="https://e-commerce-website-angular-tau.vercel.app/assets/images/master.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="box ">
                  <span>Get deliveries with FreshCart</span>
                  <div>
                    <img
                      src=" https://e-commerce-website-angular-tau.vercel.app/assets/images/app-store.svg"
                      alt=""
                    />
                    <img
                      src="https://e-commerce-website-angular-tau.vercel.app/assets/images/google-store.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr/>
            <p className="copyRights">© 2024 <span>Wafaa Mohamed</span> All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
