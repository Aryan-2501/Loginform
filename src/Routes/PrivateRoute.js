import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  let login = sessionStorage.getItem("auth");
  // console.log(login);

  function canLogin() {
    if (login === "true") {
      return true;
    }
    return false;
  }

  // console.log(canLogin());
  const useAuth = () => {
    const user = { loggedIn: canLogin() };
    return user && user.loggedIn;
  };

  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
