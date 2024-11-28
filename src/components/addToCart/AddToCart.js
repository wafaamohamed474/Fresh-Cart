import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayAddMsg, openAddAlert } from "../../store/slices/alertSlice";

const AddToCart = ({ productId }) => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const addToCart = async () => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
        dispatch(displayAddMsg(data.message));
        dispatch(openAddAlert(true));
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  return (
    <>
      <button className="btn" onClick={addToCart}>
        <span>Add To Cart</span>
      </button>
    </>
  );
};

export default AddToCart;
