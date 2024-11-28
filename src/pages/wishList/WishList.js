import React, { useEffect, useState } from "react";
import ProductsList from "../../components/productsList/ProductsList";
import { useSelector } from "react-redux";

const WishList = () => {
  const token = localStorage.getItem("authToken");
  const [product, setProduct] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isWishRemoved = useSelector((state) => state.alertMsg.isWishRemove);
  const wishlist = async () => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setProduct(data.data);
       
        
      }
    } catch (error) {
      console.error("Error fetching product to wishlist:", error);
    }
  };

  useEffect(() => {
    wishlist();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isWishRemoved]);
  return (
    <div className="pTB">
      <ProductsList
        product={product}
        windowWidth={windowWidth}
        title="WishList"
      />
    </div>
  );
};

export default WishList;
