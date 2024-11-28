import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { displayWishMsg, openWishAlert ,openRemoveWishAlert } from "../../store/slices/alertSlice";
const AddToWishList = ({ productId }) => {
  const token = localStorage.getItem("authToken");
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const checkWishlist = async () => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: `${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        const isInWishlist = data.data.some((item) => item._id === productId);
        setIsFav(isInWishlist);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  const addToWishlist = async () => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
          body: JSON.stringify({ productId: productId }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        dispatch(displayWishMsg(data.message));
        dispatch(openWishAlert(true));
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };
  const delFromWishlist = async () => {
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        dispatch(displayWishMsg(data.message));
        dispatch(openRemoveWishAlert(true));
      }
    } catch (error) {
      console.error("Error deleting product to wishlist:", error);
    }
  };
  useEffect(() => {
    checkWishlist();
  }, [productId]);
  const toggleWishList = () => {
    if (isFav) {
      delFromWishlist();
      setIsFav(false);
    } else {
      addToWishlist();
      setIsFav(true);
    }
  };
  return (
    <>
      <button className="btn" onClick={toggleWishList}>
        <FontAwesomeIcon icon={isFav ? faHeart : outlineHeart} style={{ color: isFav ? "red" : "white" }}/>
      </button>
    </>
  );
};
export default AddToWishList;
