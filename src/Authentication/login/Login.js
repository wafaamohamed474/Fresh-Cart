import React, { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
function Login() {
   
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChangeLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (!loginData.email || !loginData.password) {
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setLoading(true);
      fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data.message === "success") {
            setErrors("");
            localStorage.setItem("UserName", data.user.name);
            localStorage.setItem("authToken", data.token);
            navigate("/home");
            
          } else {
            setErrors(data.message);
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      setErrors("Please enter both email and password");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-10 ">
              <div className="loginBox">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="left">
                      <h2 className="mb-4">
                        LogIn Now
                        <FontAwesomeIcon icon={faRightToBracket} />
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <div className="input-form mb-4">
                          <label>
                            <span>Email : </span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChangeLoginInput}
                          />
                        </div>
                        <div className="input-form">
                          <label>
                            <span>Password : </span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChangeLoginInput}
                          />
                        </div>
                        <Link to="/forgetpassword" className="greenLink">
                          Forget Password
                        </Link>
                        <div className="input-form d-flex justify-content-end">
                          <button
                            className="main-btn loginBtn BtnHover"
                            type="submit"
                            id="registerBtn"
                            disabled={loading}
                          >
                            {loading ? <span className="loader"></span> : null}
                            login
                          </button>
                        </div>
                        {errors && <div className="alertMsg">{errors}</div>}
                      </form>
                      <p className="text-center mt-5">
                        Don't have an account?
                        <Link to="/register" className="greenLink">
                          Register Now
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right d-flex justify-content-center align-items-center">
                      <iframe
                        src="https://lottie.host/embed/39134ae0-b88b-45ef-8e1b-4ae02be4e263/qXaww2Y2KQ.json"
                        title="iframe"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
