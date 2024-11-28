import store from "../../store/store";
import { setUserData } from "../../store/slices/userDataSlice";

export const signOut = () => {
  // Clear localStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("UserName");

  // Reset user data in Redux
  store.dispatch(
    setUserData({
      id: null,
      name: "",
      email: "",
      password: "",
      phone: "",
      token: null,
    })
  );

  // Optionally redirect to the login page (if applicable)
  window.location.href = "/login"; // Replace "/login" with your login route
};
