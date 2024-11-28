import React from "react";
import { useForm } from "react-hook-form";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = ({ url, type , img }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const payment = async (formData) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: JSON.stringify({
          shippingAddress: formData,
        }),
      });

      const data = await response.json();
      console.log("payment :", data);
      console.log(type);

      if (data.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order has been done successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        if (type === "cash") {
          setTimeout(() => {
            navigate("/allorders", { state: { id: data.data.user } });
          }, 3000);
        } else {
          setTimeout(() => {
            window.location.href = data.session.url;
          }, 3000);
        }
      }
    } catch (error) {
      console.erro("error sending data :", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log("data ", formData);
    payment(formData);
  };
  return (
    <div className="payment pTB">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="row row2">
              <h3>Fill your address details</h3>
              <h6>Choose from your addresses:</h6>
              <div className="col-12 col-lg-6">
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <div className="form-group">
                    <label htmlFor="details">Address Details:</label>
                    <input
                      id="details"
                      type="text"
                      placeholder="ex. 30,Rue Ahmed Orabi-Giza"
                      {...register("details", {
                        required: "required",
                        minLength: {
                          value: 10,
                          message:
                            "Address must be at least 10 characters long",
                        },
                      })}
                    />
                    {errors.details && (
                      <p className="error">{errors.details.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="ex. 010000000123"
                      {...register("phone", {
                        required: "required",
                        pattern: {
                          value: /^01[0125][0-9]{8}$/,
                          message: "Invalid Egyptian phone number format",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="error">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="ex. Giza"
                      {...register("city", {
                        required: "required",
                      })}
                    />
                    {errors.city && (
                      <p className="error">{errors.city.message}</p>
                    )}
                  </div>

                  <button type="submit" className="submit-button">
                    <span>Confirm payment</span>
                  </button>
                </form>
              </div>
              <div className="col-12 col-lg-6">
                <div className="paymentImage">
                  <img
                    src={img}
                    alt="paymentImg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
