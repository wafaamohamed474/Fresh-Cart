import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/navbar/Navbar";
import "./forgetPassword.css";
import React, { useState } from "react";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import VerifyResetCode from "../verifyResetCode/VerifyResetCode";

function ForgetPassword() {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      setLoading(true);
      fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusMsg === "success") {
            console.log(data);
            setErrors("");
            setSuccess(data.message);
            setTimeout(() => {
              navigate("/verifyresetCode", {
                state: { email: formData.email },
              });
            }, 1000);
          } else {
            setErrors(data.message);
          }
          setLoading(false);
        })
        .catch((error) => console.log("error :", error));
    } else {
      setErrors("please enter email");
    }
  };
  return (
    <>
       
      <div className="forgetPassword py-5">
        <div className="container">
          <div className="row">
            <div className="forgetPasswordBox">
              <div className="row justify-content-between align-items-start">
                <div className="col-4 col-lg-3 h-100">
                  <div className="left">
                    <ol>
                      <li>
                        <p>User Email :</p>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-8 col-lg-9 h-100">
                  <div className="right">
                    <form onSubmit={handleSubmit}>
                      <h2>
                        Enter your email and we'll send you instructions on how
                        to reset your password:
                      </h2>
                      <div className="input-form mb-4">
                        <label className="mb-3">
                          <FontAwesomeIcon
                            icon={faAsterisk}
                            className="Asterisk"
                          />
                          <span>Email : </span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder="ex.aaaa@aaa.aa"
                          value={formData.email}
                          onChange={handleChangeInput}
                        />
                        {errors ? (
                          <div className="alertMsg">{errors}</div>
                        ) : success ? (
                          <div className="successMsg">{success}</div>
                        ) : null}
                      </div>
                      <div className="input-form d-flex justify-content-end">
                        <button
                          className="main-btn BtnHover loginBtn"
                          type="submit"
                          id="registerBtn"
                          disabled = {loading}
                        >
                          {loading && <span className="loader"></span>}
                          Send Code
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="pcolor">
                  need help?
                  <Link to="/" className="greenLink">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
