import Register from "./Authentication/register/Register";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Authentication/login/Login";
import ForgetPassword from "./Authentication/forgetPassword/ForgetPassword";
import VerifyResetCode from "./Authentication/verifyResetCode/VerifyResetCode";
import RestPassword from "./Authentication/resetPassword/RestPassword";
import Home from "./pages/home/Home";
import Brands from "./pages/brands/Brands";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Details from "./pages/details/Details";
import SpecificBrand from "./pages/specificBrand/SpecificBrand";
import SpecificCategory from "./pages/specificCategory/SpecificCategory";
import { useEffect, useState } from "react";
import MainLoader from "./components/mainLoader/MainLoader";
import SpecificSubCategory from "./pages/specificSubCategory/SpecificSubCategory";
import Cart from "./pages/cart/Cart";
import WishList from "./pages/wishList/WishList";
import CashPayment from "./pages/cashPayment/CashPayment";
import Settings from "./pages/settings/Settings";
import AcountSettings from "./components/acountSettings/AcountSettings";
import PrivacySettings from "./components/privacySettings/PrivacySettings";
import AddressSettings from "./components/addressSettings/AddressSettings";
import { initializeUserData } from "./Authentication/GetData/GetData";
import GetUserOrders from "./components/getUserOrders/GetUserOrders";
import OnlinePayment from "./pages/onlinePayment/OnlinePayment";
import AuthProvider from "./Authentication/AuthProvider/AuthProvider";
import NotFound from "./pages/notFound/NotFound";
import NavbarLayout from "./components/Layout/NavbarLayout";
import HeaderLayout from "./components/Layout/HeaderLayout";
import MinimalLayout from "./components/Layout/MinimalLayout";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <MainLoader />}
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verifyresetCode" element={<VerifyResetCode />} />
          <Route path="/restpassword" element={<RestPassword />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route element={<AuthProvider />}>
            <Route path="/home" element={<Home />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/details/:ProductID" element={<Details />} />
            <Route
              path="/specific-brand/:BrandID"
              element={<SpecificBrand />}
            />
            <Route
              path="/specific-category/:CategoryID"
              element={<SpecificCategory />}
            />
            <Route
              path="/specific-subcategory/:SubCategoryID"
              element={<SpecificSubCategory />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/useraddress/cash/:CartID" element={<CashPayment />} />
            <Route
              path="/useraddress/online/:OrderID"
              element={<OnlinePayment />}
            />
            <Route path="/settings" element={<Settings />}>
              <Route
                path="account-settings"
                element={<AcountSettings />}
                loader={initializeUserData()}
              />
              <Route path="privacy-settings" element={<PrivacySettings />} />
              <Route path="address-settings" element={<AddressSettings />} />
            </Route>
            <Route path="/allorders" element={<GetUserOrders />} />
          </Route>
        </Route>

        <Route element={<MinimalLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
