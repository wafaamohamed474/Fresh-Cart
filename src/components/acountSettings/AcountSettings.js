import React, { useState } from "react";
import "./acountSettings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  displayModifiyMsg,
  openModifiyAlert,
} from "../../store/slices/alertSlice";
import { Alert, Snackbar } from "@mui/material";

const AcountSettings = () => {
  const dispatch = useDispatch();
  const alertMsg = useSelector((state) => state.alertMsg);
  const [severity, setSeverity] = useState("");
  const userData = useSelector((state) => state.userData);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [openLock, setOpenLock] = useState(false);

  const updatedInputs = () => {
    const inputs = {};
    if (name !== userData.name) inputs.name = name;
    if (email !== userData.email) inputs.email = email;
    if (phone !== userData.phone) inputs.phone = phone;
    return inputs;
  };

  const putData = async () => {
    const body = updatedInputs();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${userData.token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.message === "success") {
      const updatedUserData = { ...userData, ...body };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      localStorage.setItem("UserName", data.user.name);
      setOpenLock(false);
      setSeverity("success");
      dispatch(openModifiyAlert(true));
      dispatch(displayModifiyMsg(`${data.message}`));
      window.location.reload();
    } else {
      setSeverity("error");
      dispatch(openModifiyAlert(true));
      dispatch(displayModifiyMsg(`${data.message} : ${data.errors.msg}`));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putData();
  };
  const editData = (e) => {
    e.preventDefault();
    setOpenLock(!openLock);
  };
  return (
    <div className="accountSettings">
      <Snackbar
        open={alertMsg.isModified}
        autoHideDuration={2000}
        onClose={() => dispatch(openModifiyAlert(false))}
      >
        <Alert severity={severity}>{alertMsg.MsgModifiy}</Alert>
      </Snackbar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Name :</label>
          <div className="input-div">
            <input
              type="text"
              disabled={!openLock}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FontAwesomeIcon icon={openLock ? faLockOpen : faLock} />
          </div>
        </div>
        <div className="form-group">
          <label>Email :</label>
          <div className="input-div">
            <input
              type="email"
              disabled={!openLock}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon icon={openLock ? faLockOpen : faLock} />
          </div>
        </div>
        <div className="form-group">
          <label>Phone :</label>
          <div className="input-div">
            <input
              type="tel"
              disabled={!openLock}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FontAwesomeIcon icon={openLock ? faLockOpen : faLock} />
          </div>
        </div>
        {openLock ? (
          <button type="submit" className="btn">
            Update
          </button>
        ) : (
          <button type="button" className="btn" onClick={(e) => editData(e)}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default AcountSettings;
