import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Home from "../Pages/Home";
import SignupPage from "../Pages/SignupPage";
import PrivateRoute from "./PrivateRoute";

function Routelist() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Routelist;
