import { faHeart, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./header.css";
import logo from "../../assets/freshcart-logo.svg";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import NestedDropdownMenu from "../nestedDropDown/NestedDropDown";
import SearchProduct from "../searchProduct/SearchProduct";
import { signOut } from "../../Authentication/signOut/SignOut";

function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const location = useLocation();

  const toggleUserList = () => {
    setIsToggled(!isToggled);
  };
  const handleClick = () => {
    setIsToggled(false);
  };
  const handleScrollHeader = () => {
    if (window.scrollY > 100) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }
  };

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNavDropdown");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollHeader);
    return () => {
      window.removeEventListener("scroll", handleScrollHeader);
    };
  }, []);

  useEffect(() => {
    closeNavbar();
  }, [location]);

  return (
    <div className="header">
      <div className={`subsetHeaderFirst ${isFixed ? "fixedHeaderFirst" : ""}`}>
        <div className="bankPaymentOffer">
          <img
            src="https://e-commerce-website-angular-tau.vercel.app/assets/images/paymob00_topstrip_ar_web.jpg"
            alt=""
          />
          <div></div>
        </div>
        <div className="headerLogoContent">
          <div className="container">
            <div className="row">
              <div className="headerLogo">
                <img src={logo} alt="fresh_cart_logo" />
              </div>
              <div className="headerLogoIcons">
                <Link to='/wishlist' className="LinkIcon">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
                <Link to="/allorders" className="LinkIcon">
                  <FontAwesomeIcon icon={faTruck} />
                </Link>
                <div className="userList">
                  <button className="btn" onClick={toggleUserList}>
                    <div>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span>{localStorage.getItem("UserName")}</span>
                  </button>
                  <ul className={isToggled ? "" : "displayNone"}>
                    <li>
                      <Link
                        to="/settings/account-settings"
                        onClick={handleClick}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button className="signOut" onClick={() => signOut()}>
                        SignOut
                      </button>
                    </li>
                  </ul>
                
              </div>
                </div>
                
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`navbar navbar-expand-lg ${
          isFixed ? "fixedHeaderSecond" : ""
        }`}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/home"
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/cart"
                  onClick={closeNavbar}
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/products"
                  onClick={closeNavbar}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/brands"
                  onClick={closeNavbar}
                >
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/categories"
                  onClick={closeNavbar}
                >
                  Categories
                </NavLink>
              </li>
              
              <NestedDropdownMenu />
            </ul>
            <SearchProduct />
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
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
