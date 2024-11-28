import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleButtonFunc = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="dflex w-100">
          <div className="logo w-25">
            <Link to="/">
              {" "}
              <img
                src="https://e-commerce-website-angular-tau.vercel.app/assets/images/freshcart-logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          <div className={`navbarLinks  w-50`}>
            <div className="socialIcons">
              <Link>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link>
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link>
                <FontAwesomeIcon icon={faTiktok} />
              </Link>
              <Link>
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link>
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
              <Link>
                <FontAwesomeIcon icon={faYoutube} />
              </Link>
            </div>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </div>
          <button className="btn border-2 toggleBtn" onClick={toggleButtonFunc}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      <div className={`toggleList ${isOpen ? "displaynone" : ""}`}>
        <Link to="/login" className="login">
          Login
        </Link>
        <Link to="/register" className="register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
