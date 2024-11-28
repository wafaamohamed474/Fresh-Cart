import {
  faBagShopping,
  faBars,
  faEye,
  faStar,
  faTableCells,
  faHeart,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import "./productsList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import AddToCart from "../addToCart/AddToCart";
import AddToWishList from "../addToWishList/AddToWishList";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddAlert,
  openRemoveWishAlert,
  openWishAlert,
} from "../../store/slices/alertSlice";
const ProductsList = ({ product, windowWidth, title }) => {
  const [displayProductsInList, setDisplayProductsInList] = useState(true);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const BarsIcon = useRef(null);
  const TableIcon = useRef(null);
  const alert = useSelector((state) => state.alertMsg);
  const dispatch = useDispatch();

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: false,
  };
  const handleHoverEnter = (id) => setHoveredProductId(id);
  const handleHoverLeave = () => setHoveredProductId(null);
  const sliderImages = (e) => {
    return (
      <Slider {...settings}>
        {e.images.map((img, index) => (
          <img
            key={index}
            src={
              img.includes(
                "https://ecommerce.routemisr.com/Route-Academy-products/"
              )
                ? img
                : `https://ecommerce.routemisr.com/Route-Academy-products/${img}`
            }
            alt={e.title}
          />
        ))}
      </Slider>
    );
  };
  const displayInListStyle = () => {
    setDisplayProductsInList(true);
    BarsIcon.current?.classList.add("active");
    TableIcon.current?.classList.remove("active");
  };
  const displayInDetailsStyle = () => {
    setDisplayProductsInList(false);
    TableIcon.current?.classList.add("active");
    BarsIcon.current?.classList.remove("active");
  };
  const displayProductsInListStyle = (product) => {
    return product.map((e) => (
      <div
        className="col-12 col-md-4 col-lg-3"
        key={`${e._id}-${e.category.name}`}
      >
        <div
          className="productItem"
          onMouseOver={() => handleHoverEnter(e._id)}
          onMouseOut={handleHoverLeave}
        >
          <Link to={`/details/${e._id}`}>
            <div className="productItemcontent">
              <button className="seeProduct">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <div className="Image-box">
                {hoveredProductId === e._id ? (
                  sliderImages(e)
                ) : (
                  <img src={e.imageCover} alt={e.title} />
                )}
              </div>
              <h5>{e.category.name}</h5>
              <h6>{e.title.slice(0, 12)}</h6>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#dc3545",
                  fontSize: "14px",
                }}
              >
                EGP {e.price}
              </span>
              <div className="PriceRating">
                <span>EGP {(e.price * 0.91).toFixed(2)}</span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                  {e.ratingsAverage}
                </span>
              </div>
            </div>
          </Link>
          <div className="btnsDiv">
            <AddToCart productId={e._id} />
            <AddToWishList productId={e._id} />
          </div>
        </div>
      </div>
    ));
  };
  const displayProductsInDetailsStyle = (product) => {
    return product.map((e) => (
      <div className="col-md-4 col-md-12 col-lg-12" key={e._id}>
        <div
          className="productItem"
          onMouseOver={() => handleHoverEnter(e._id)}
          onMouseOut={handleHoverLeave}
        >
          <Link to={`/details/${e._id}`}>
            <div className="productItemcontent">
              <button className="seeProduct">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <div className="row">
                <div className="col-md-3">
                  <div className="Image-box">
                    {hoveredProductId === e._id ? (
                      sliderImages(e)
                    ) : (
                      <img src={e.imageCover} alt={e.title} />
                    )}
                  </div>
                </div>
                <div className="col-md-9">
                  <h5>{e.category.name}</h5>
                  <p>{e.description}</p>
                  <p>
                    review : <span>{e.ratingsAverage}</span>
                    <FontAwesomeIcon icon={faEye} />
                  </p>
                  <p>
                    sold : <span>{e.sold}</span>
                    <FontAwesomeIcon icon={faBagShopping} />
                  </p>

                  <h6>{e.title}</h6>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#dc3545",
                      fontSize: "14px",
                    }}
                  >
                    EGP {e.price}
                  </span>
                  <div className="PriceRating">
                    <span>EGP {(e.price * 0.91).toFixed(2)}</span>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                      {e.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="btnsDiv">
            <AddToCart productId={e._id} />
            <AddToWishList productId={e._id} />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="productsList">
      <Snackbar
        open={alert.isAddOpen}
        autoHideDuration={2000}
        onClose={() => dispatch(openAddAlert(false))}
      >
        <Alert
          color="success"
          icon={<FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />}
        >
          {alert.MsgAdd}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.isWishOpen}
        autoHideDuration={2000}
        onClose={() => dispatch(openWishAlert(false))}
      >
        <Alert
          icon={<FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />}
          color="error"
        >
          {alert.MsgWish}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.isWishRemove}
        autoHideDuration={2000}
        onClose={() => dispatch(openRemoveWishAlert(false))}
      >
        <Alert severity="warning" color="warning">
          {alert.MsgWish}
        </Alert>
      </Snackbar>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center AllProducts">
          <h1>
            {title} <span>Products</span>
          </h1>
          <div>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => displayInListStyle()}
              id="BarsIcon"
              ref={BarsIcon}
              className="active"
            />
            <FontAwesomeIcon
              icon={faTableCells}
              onClick={() => displayInDetailsStyle()}
              id="TableIcon"
              ref={TableIcon}
            />
          </div>
        </div>

        <div className="row">
          {displayProductsInList || windowWidth < 768
            ? displayProductsInListStyle(product)
            : displayProductsInDetailsStyle(product)}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
