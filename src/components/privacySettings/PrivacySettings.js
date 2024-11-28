import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  displayModifiyMsg,
  openModifiyAlert,
} from "../../store/slices/alertSlice";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
const PrivacySettings = () => {
  const dispatch = useDispatch();
  const alertMsg = useSelector((state) => state.alertMsg);
  const userData = useSelector((state) => state.userData);
  const [severity, setSeverity] = useState("");
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [openLock, setOpenLock] = useState(false);
  const navigate = useNavigate();
  const putData = async () => {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${userData.token}`,
        },
        body: JSON.stringify({
          currentPassword,
          password,
          rePassword,
        }),
      }
    );

    const data = await response.json();
    if (data.message === "success") {
      setOpenLock(false);
      setSeverity("success");
      dispatch(openModifiyAlert(true));
      dispatch(displayModifiyMsg(`${data.message}`));
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setSeverity("error");
      dispatch(openModifiyAlert(true));
      const errorMsg = data.errors?.msg ?? data.message;
      dispatch(displayModifiyMsg(errorMsg));
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
    <div className="accountSettings privacySettings">
      <Snackbar
        open={alertMsg.isModified}
        autoHideDuration={2000}
        onClose={() => dispatch(openModifiyAlert(false))}
      >
        <Alert severity={severity}>{alertMsg.MsgModifiy}</Alert>
      </Snackbar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Current Password :</label>
          <div className="input-div">
            <input
              type="password"
              disabled={!openLock}
              value={currentPassword}
              placeholder="********"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={openLock ? faLockOpen : faLock} />
          </div>
        </div>
        <div className="form-group">
          <label>Password :</label>
          <div className="input-div">
            <input
              type="password"
              disabled={!openLock}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={openLock ? faLockOpen : faLock} />
          </div>
        </div>
        <div className="form-group">
          <label>rePassword :</label>
          <div className="input-div">
            <input
              type="password"
              disabled={!openLock}
              value={rePassword}
              placeholder="********"
              onChange={(e) => setRePassword(e.target.value)}
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

export default PrivacySettings;
