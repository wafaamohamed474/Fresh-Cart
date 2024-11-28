import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cartDetails.css";
import Swal from "sweetalert2";
import EmptyCart from "../emptyCart/EmptyCart";
import UpdateCartQuantity from "../updateCartQuantity/UpdateCartQuantity";
import DeleteCartItem from "../deleteCartItem/DeleteCartItem";
const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartID, setCartID] = useState();

  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const token = localStorage.getItem("authToken");
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: `${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setCartItems(data.data.products);
        setCartID(data.data._id)
      } else {
        console.error("Failed to fetch cart data:", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  useEffect(() => {
    const calculateTotalCartPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + TotalItemPrice(item),
        0
      );
      setTotalCartPrice(total.toFixed(2));
    };
    calculateTotalCartPrice();
  }, [cartItems]);
  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to clear your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            method: "DELETE",
            headers: {
              token: `${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.message === "success") {
          setCartItems([]);
          setTotalCartPrice(0);
        } else {
          console.error("Failed to clear cart data:", data.message);
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };
  const subTotal = (e) => {
    return e.price * e.count;
  };
  const offer = (e) => {
    return subTotal(e) * 0.09;
  };
  const subTotalAfterOffer = (e) => {
    return subTotal(e) - offer(e);
  };
  const includedTexes = (e) => {
    return subTotalAfterOffer(e) * 0.14;
  };
  const TotalItemPrice = (e) => {
    return subTotalAfterOffer(e) + includedTexes(e) + 100;
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cartDetails pTB">
          <div className="container">
            <div className="row">
              <div className="cartDetailsBox">
                <div className="clearBtnDiv">
                  <h2>Shop Cart</h2>
                  <button className="btn" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                </div>
                <h3>
                  Total Cart Items Price : <span>EGP {totalCartPrice}</span>
                </h3>
                {cartItems.map((e) => (
                  <div className="row py-5" key={e._id}>
                    <div className="col-12 col-lg-2 imgCol">
                      <div className="imageBox">
                        <img src={e.product.imageCover} alt="" />
                      </div>
                    </div>
                    <div className="col-12 col-lg-10">
                      <div className="row row3">
                        <div className="col-12 col-md-6 col-lg-4">
                          <p>item</p>
                          <h4>{e.product.title}</h4>
                          <p className="itemPrice">
                            Item Price : EGP {e.price}
                          </p>
                        
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <p>Amount</p>
                          <UpdateCartQuantity product={e.product} token={token} count={e.count} onUpdate={fetchCartItems}/>
                          <DeleteCartItem  product={e.product} token={token} onUpdate={fetchCartItems}/>
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                          <p>Total</p>
                          <ul>
                            <li>
                              Subtotal : <span>{`EGP ${subTotal(e)}.00`}</span>
                            </li>
                            <li>
                              -9% offer :{" "}
                              <span>{`EGP ${offer(e).toFixed(2)}`}-</span>
                            </li>
                            <li>
                              Included 14% Taxes :
                              <span>{`EGP ${includedTexes(e).toFixed(
                                2
                              )}`}</span>
                            </li>
                            <li>
                              Shiping : <span>{`EGP 100.00`}</span>
                            </li>

                            <hr />
                            <li>
                              Total Price :{" "}
                              <span>{`EGP ${TotalItemPrice(e).toFixed(
                                2
                              )}`}</span>
                            </li>
                          </ul>
                          <Link to={`/details/${e.product._id}`}>
                            product details
                          </Link>
                           
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                    <div className="paymentWays">
                      <Link to={`/useraddress/online/${cartID}`}>
                      <span>Online Payment</span>
                      <div className="imgPayment">
                        <img src="https://e-commerce-website-angular-tau.vercel.app/assets/images/visa-1.svg" alt="imgOnlinePayment"/>
                      </div>
                       </Link>
                       <Link to={`/useraddress/cash/${cartID}`}>
                      <span>Cash On Delevery</span>
                      <div className="imgPayment">
                        <img src="https://e-commerce-website-angular-tau.vercel.app/assets/9368523.png" alt="imgOnlinePayment"/>
                      </div>
                       </Link>
                    </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;
