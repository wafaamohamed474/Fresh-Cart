import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { json, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./verifyResetCode.css";
function VerifyResetCode() {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [anotherCodeLoading, setAnotherCodeLoading] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();
  const [formData, setFormData] = useState({
    resetCode: "",
  });
  const email = Location.state?.email;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.resetCode) {
      setLoading(true);
      fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "Success") {
            setErrors("");

            setSuccess("Email confirmed successfully");
            setTimeout(() => {
              navigate("/restpassword" , {state :{email : email}});
            }, 1000);
          } else {
            setErrors(data.message);
          }
          setLoading(false);
        })
        .catch((error) => console.log("error :", error));
    } else {
      setErrors("Please enter code");
      setLoading(false);
    }
  };

  const sendAntherCode = () => {
    setAnotherCodeLoading(true);
    fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.statusMsg === "success") {
          setErrors("");
          setSuccess("Another code has been sent to your email.");
        } else {
          setErrors(data.message);
        }
        setAnotherCodeLoading(false);
      })
      .catch((error) => {
        console.log("Error : ", error);
        setAnotherCodeLoading(false);
      });
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
                    <ol type="1">
                      <li>
                        <div>
                          <p>User Email :</p>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </li>
                      <li>
                        <div>
                          <p>Verify Reset Code :</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-8 col-lg-9 h-100 text-center">
                  <div className="right">
                    <h2>Enter your code</h2>
                    <p>
                      We need to confirm that you authorized changes to your
                      account
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="input-form mb-4 input-bg">
                        <label>
                          We've sent a text message to ***{email}*** with your
                          authentication code:
                        </label>
                        <input
                          type="text"
                          name="resetCode"
                          placeholder="000000"
                          onChange={handleChangeInput}
                          value={formData.resetCode}
                        />
                        {errors ? (
                          <div className="alertMsg">{errors}</div>
                        ) : success ? (
                          <div className="successMsg">{success}</div>
                        ) : null}
                      </div>
                      <div className="input-form d-flex justify-content-center">
                        <button
                          className="main-btn BtnHover loginBtn"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && <span className="loader"></span>}
                          Verify code
                        </button>
                      </div>
                    </form>
                    <button
                      className="sendAntherCode"
                      type="button"
                      onClick={sendAntherCode}
                      disabled={anotherCodeLoading}
                    >
                      {anotherCodeLoading ? (
                        <span className="loader1"></span>
                      ) : (
                        <span>send anther code</span>
                      )}
                    </button>
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

export default VerifyResetCode;
