import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import './getUserOrders.css'
const GetUserOrders = () => {
  const userData = useSelector((state) => state.userData);
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
        
      } else {
        console.error(data.message);
      }
    };
    getOrders();
  }, [userData.id]);
  return (
    <div className="userOrders pTB">
      <div className="container">
        {orders && orders.map((order)=>(
            <div className="row row1" key={order.id}>
            <div className="col-12 col-md-3">
                {order.cartItems && order.cartItems.map((item)=>(
                    <div className="col-12 item_image_box" key={item._id}>
                            <img src={`${item.product.imageCover}`} alt={`${item.product.title}-img`}/>
                    </div>
                ))}
            </div>
            <div className="col-12 col-md-9 py-5 order-info">
                    <div className="col-12">
                            <h6><span>Order ID : </span>{order.id}</h6>
                            <p><span>order date : </span>{order.createdAt}</p>
                            <p><span>payment method : </span>{order.paymentMethodType}</p>
                            <p><span>shipping city : </span>{order.shippingAddress && order.shippingAddress.city}</p>
                            <p><span>shipping address : </span>{order.shippingAddress && order.shippingAddress.details}</p>
                            <p><span>phone : </span>{order.shippingAddress && order.shippingAddress.phone}</p>
                    </div>
                    <div className="col-12">
                        <p><span>Order Delivered : </span>{order.isDelivered ? `Yes` : `No`}</p>
                        <p><span>Order Paid : </span>{order.isPaid ? `Yes` : `No`}</p>
                        <p><span>Order Last Update : </span>{order.updatedAt}</p>
                        <Link>Order Details</Link>
                    </div>
                    
                 
                 

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUserOrders;
