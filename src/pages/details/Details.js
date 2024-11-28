import {
  faBagShopping,
  faEye,
  faHeart,
  faStar,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddToCart from "../../components/addToCart/AddToCart";
import AddToWishList from "../../components/addToWishList/AddToWishList";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openAddAlert, openRemoveWishAlert, openWishAlert } from "../../store/slices/alertSlice";
function Details() {
  const [product, setProduct] = useState({});
  const [mainProductImage, setMainProductImage] = useState("");
  const { ProductID } = useParams();
  const alert = useSelector((state) => state.alertMsg);
  const dispatch = useDispatch()
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products/${ProductID}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [ProductID]);

  const handleDisplayProductImage = (img) => {
    setMainProductImage(img);
  };

  return (
    <div className="details pTB">
      <Snackbar  open={alert.isAddOpen} autoHideDuration={2000} onClose={()=>dispatch(openAddAlert(false))}>
        <Alert color="success"  icon={<FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />}  >
          {alert.MsgAdd}
        </Alert>
      </Snackbar>
      <Snackbar  open={alert.isWishOpen} autoHideDuration={2000} onClose={()=>dispatch(openWishAlert(false))}>
        <Alert  icon={<FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />}  color="error">
          {alert.MsgWish}
        </Alert>
      </Snackbar>
      <Snackbar  open={alert.isWishRemove} autoHideDuration={2000} onClose={()=>dispatch(openRemoveWishAlert(false))}>
        <Alert severity="warning"  color="warning">
          {alert.MsgWish}
        </Alert>
      </Snackbar>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="imageBox"> 
              <AddToWishList productId={ProductID}/>
              <div className="imageBoxTop">
                <img
                  src={mainProductImage || product.imageCover}
                  alt="productImage"
                />
              </div>
              <div className="imageBoxBottom">
                <Slider {...settings}>
                  {product.images &&
                    product.images.slice(0, 4).map((img, index) => (
                      <div
                        key={index}
                        className="imageDiv"
                        onClick={() => handleDisplayProductImage(img)}
                      >
                        <img src={img} alt={`thumbnail`} />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="detailsContent">
              <p>{product.description}</p>
              <h2>{product.title}</h2>
              <p>
                Available in Stock: <span>{product.quantity}</span>
              </p>
              <p>
                Reviews:{" "}
                <span className="starIcon">
                  {product.ratingsAverage}
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </p>
              <p>
                Sold:{" "}
                <span>
                  {product.sold} <FontAwesomeIcon icon={faBagShopping} />
                </span>
              </p>
              <p>
                Total Views:{" "}
                <span>
                  {product.reviews} <FontAwesomeIcon icon={faEye} />
                </span>
              </p>

              <p>{product.brand && product.brand.name}</p>


              {product.brand && (
                <Link to={`/specific-brand/${product.brand._id}`} className="brandLink">
                  <div className="brandCard">
                    {product.brand.image && (
                      <img
                        src={product.brand.image}
                        alt={`${product.brand.name} img`}
                      />
                    )}
                  </div>
                </Link>
              )}

              <hr />

              <p>{product.category && product.category.name}</p>

              <div className="PriceRating">
                <p>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#dc3545",
                      fontSize: "12px",
                      marginRight: "5px",
                    }}
                  >
                    {(product.price * 0.91).toFixed(2)}{" "}
                  </span>
                  {product.price} EGP
                </p>
                <p>
                  <FontAwesomeIcon icon={faStar} />
                  <span>{product.ratingsAverage}</span>
                </p>
              </div>
              <div className="btnsDiv">
                <AddToCart productId={product._id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
