import React, { useEffect } from "react";

const DeleteCartItem = ({ product, token, onUpdate }) => {
  const deleteItem = () => {
    try {
      fetch(`https://ecommerce.routemisr.com/api/v1/cart/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusMsg === "error") {
            console.error("Error:", data.message);
          } else {
            onUpdate();
          }
        });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

   
  
  return (
    <div>
      <button className="btn updateBtn" onClick={deleteItem}>Delete..</button>
    </div>
  );
};

export default DeleteCartItem;
