import React from "react";
import { Outlet } from "react-router-dom";

const MinimalLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Outlet />
    </>
  );
};

export default MinimalLayout;
