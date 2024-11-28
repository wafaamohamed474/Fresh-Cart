import store from "../../store/store";
import { setUserData } from "../../store/slices/userDataSlice";
export const getData = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const verifyToken = async () => {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: { "Content-Type": "application/json", token },
        }
      );
      const data = await response.json();
      if (data.message === "verified") {
        store.dispatch(setUserData({ id: data.decoded.id }));
        const userId = store.getState().userData.id;
        verifyData(userId);
      }
    };
    const verifyData = async (userId) => {
      const userResponse = await fetch(
        `https://ecommerce.routemisr.com/api/v1/users/${userId}`,
        {
          headers: { "Content-Type": "application/json", token },
        }
      );

      const data = await userResponse.json();
      const userData = {
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        password: data.data.password,
        phone: data.data.phone,
        token: token,
      };
      store.dispatch(setUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
    };
    await verifyToken();
  }
};
export const initializeUserData = async () => {
  const savedUserData = localStorage.getItem("userData");
  if (savedUserData) {
    const userData = JSON.parse(savedUserData);
    store.dispatch(setUserData(userData));
  } else {
    await getData();
  }
};
