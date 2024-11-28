import React, { useState } from "react";
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./restPassword.css";
function RestPassword() {
  const [errors, setErrors] = useState({});
 
  const navigate = useNavigate();
  const Location = useLocation();
  const [formData, setFormData] = useState({
    newPassword: "",
    rePassword: "",
  });
  const email = Location.state?.email;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };
  const validate = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case "newPassword":
        if (!value) {
          newErrors.newPassword = "Required";
        } else if (value.length < 6) {
          newErrors.newPassword = "Password must be at least 6 characters";
        } else {
          delete newErrors.newPassword;
        }
        break;

      case "rePassword":
        if (!value) {
          newErrors.rePassword = "Required";
        } else if (value !== formData.newPassword) {
          newErrors.rePassword = "Passwords not match";
        } else {
          delete newErrors.rePassword;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).every((field) => field !== "") &&
      Object.values(errors).length === 0
    ) {
      fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword: formData.newPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
           
          if (data.statusMsg !== "fail") {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    }
  };
  return (
    <>
       
      <div className="VerifyResetCode  py-5">
        <div className="container">
          <div className="row">
            <div className="forgetPasswordBox">
              <div className="row justify-content-between align-items-start">
                <div className="col-4 col-lg-3 h-100">
                  <div className="left">
                    <ol>
                      <li>
                        <div>
                          <p>User Email :</p>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </li>
                      <li>
                        <div>
                          <p>Verify Reset Code :</p>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </li>
                      <li>
                        <div>
                          <p>Reset Password :</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-8 col-lg-9 h-100">
                  <div className="right">
                    <h2 className="restyourpassword ">Reset your password</h2>
                    <p>Please use strong password</p>
                    <form onSubmit={handleSubmit}>
                      <div className="input-form mb-4 input-bg">
                        <label className="mb-3">
                          <span>New Password : </span>
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="Aa00000"
                          value={formData.newPassword}
                          onChange={handleChangeInput}
                        />
                        {errors.newPassword && (
                          <div className="alertMsg">{errors.newPassword}</div>
                        )}
                      </div>

                      <div className="input-form mb-4 input-bg">
                        <label className="mb-3">
                          <span>rePassword : </span>
                        </label>
                        <input
                          type="password"
                          name="rePassword"
                          placeholder="Aa00000"
                          value={formData.rePassword}
                          onChange={handleChangeInput}
                        />
                        {errors.rePassword && (
                          <div className="alertMsg">{errors.rePassword}</div>
                        )}
                      </div>
                      <div className="input-form d-flex justify-content-end">
                        <button
                          className="main-btn BtnHover loginBtn"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="pcolor">
                  need help?
                  <Link to="/contactus" className="greenLink">
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

export default RestPassword;
