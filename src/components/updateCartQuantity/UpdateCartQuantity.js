import React, { useEffect, useState } from "react";

 const UpdateCartQuantity = ({ product, token, count, onUpdate }) => {
  const [cartQuantity, setCartQuantity] = useState(count);
  const [updateBtn, setUpdateBtn] = useState(false);


 

  const updateCartQuantity = () => {
    
    try {
      fetch(`https://ecommerce.routemisr.com/api/v1/cart/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify({
          count: cartQuantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusMsg === "error") {
            console.error("Error:", data.message);
          } else {
            onUpdate()
          }
        });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  useEffect(() => {
    updateCartQuantity();
  }, [updateBtn]);

  const decrementQ = () => {
    if(cartQuantity > 1)
    setCartQuantity(cartQuantity - 1);
  };
  const incrementQ = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const handleUpdate = () => {
    setUpdateBtn(!updateBtn);
  };

  return (
    <>
      <div className="right">
        <button className="btn" onClick={() => decrementQ()}>
          -
        </button>
        <span>{cartQuantity}</span>
        <button className="btn" onClick={() => incrementQ()}>
          +
        </button>
      </div>
      <button className="btn updateBtn" onClick={() => handleUpdate()}>
        Update
      </button>
    </>
  );
};


export default UpdateCartQuantity