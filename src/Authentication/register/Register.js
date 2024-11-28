import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [existAccountError, setExistAccountError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });
   
  const validate = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Required";
        } else if (value.trim().length < 3) {
          newErrors.name = "Name must be at least 3 chars";
        } else {
          delete newErrors.name;
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Invalid email";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;

      case "rePassword":
        if (!value) {
          newErrors.rePassword = "Required";
        } else if (value !== formData.password) {
          newErrors.rePassword = "Passwords not match";
        } else {
          delete newErrors.rePassword;
        }
        break;

      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Required";
        } else if (!/^(01)[0-9]{9}$/.test(value)) {
          newErrors.phone = "accept only egypt phone numbers";
        } else {
          delete newErrors.phone;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };
  const checkIcon = (field) => {
    if (!formData[field]) return null; // No icon if input is empty
    return errors[field] ? (
      <>
        <FontAwesomeIcon
          style={{ color: "rgb(220, 53, 69)" }}
          icon={faXmark}
          className="error-icon"
        />
      </>
    ) : (
      <FontAwesomeIcon
        style={{ color: "#0aad0a" }}
        icon={faCheck}
        className="success-icon"
      />
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(formData).every((field) => field !== "") &&
      Object.values(errors).length === 0
    ) {
      fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            localStorage.setItem('UserName' , formData.name)
             
            
            Swal.fire({
              position: "center",
              title: "Success",
              titleText: `Welcome ${formData.name} you have successfully Registered`,
              confirmButtonColor: "#0aad0a",
              showConfirmButton: true,
              color: "#212529",
              icon: "success",
              iconColor: "#0aad0a",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          } else setExistAccountError(data.message);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <>
      <div className="register py-5">
        <div className="container">
          <div className="row registerBox">
            <div className="col-lg-10">
              <div className="content">
                <h2>Register Now :</h2>
                <form onSubmit={handleSubmit} id="form">
                  <div className="input-form">
                    <label>
                      <span>Name : </span>
                      {checkIcon("name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChangeInput}
                    />
                    {errors.name && (
                      <div className="alertMsg">{errors.name}</div>
                    )}
                  </div>
                  {/* =========== */}
                  <div className="input-form">
                    <label>
                      <span>Email : </span>
                      {checkIcon("email")}
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeInput}
                    />
                    {errors.email && (
                      <div className="alertMsg">{errors.email}</div>
                    )}
                  </div>
                  {/* ========== */}
                  <div className="input-form">
                    <label>
                      <span>Password : </span>
                      {checkIcon("password")}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChangeInput}
                    />
                    {errors.password && (
                      <div className="alertMsg">{errors.password}</div>
                    )}
                  </div>

                  {/* =========== */}
                  <div className="input-form">
                    <label>
                      <span>Repassword : </span>
                      {checkIcon("rePassword")}
                    </label>
                    <input
                      type="password"
                      name="rePassword"
                      value={formData.rePassword}
                      onChange={handleChangeInput}
                    />
                    {errors.rePassword && (
                      <div className="alertMsg">{errors.rePassword}</div>
                    )}
                  </div>
                  {/* ============ */}

                  <div className="input-form">
                    <label>
                      <span>Phone : </span>

                      {checkIcon("phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChangeInput}
                    />
                    {errors.phone && (
                      <div className="alertMsg">{errors.phone}</div>
                    )}
                  </div>
                  {/* =========== */}
                  <div className="input-form d-flex justify-content-end">
                    <button
                      className="main-btn registerBtn BtnHover"
                      type="submit"
                      id="registerBtn"
                    >
                      Register
                    </button>
                  </div>
                  {existAccountError && (
                    <div className="alertMsg">{existAccountError}</div>
                  )}
                </form>
                <p className="text-center mt-5">
                  already have an account?
                  <Link to="/login" className="loginNow greenLink">
                    LogIn Now
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

export default Register;
