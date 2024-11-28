import { NavLink, Outlet } from "react-router-dom";
import "./settings.css";

const Settings = () => {
  return (
    <div className="settings pTB">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4">
            <div className="btnsCol">
              <NavLink to="account-settings" className="btn">
                Account Settings
              </NavLink>
              <NavLink to="privacy-settings" className="btn">
                Privacy Settings
              </NavLink>
              <NavLink to="address-settings" className="btn">
                Address Settings
              </NavLink>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
