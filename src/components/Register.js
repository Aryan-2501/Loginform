import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { signupRoute } from "../Utils/APIRoutes";

function Register() {
  let navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  async function submitHandler(e) {
    e.preventDefault();

    console.log(values);
    if (handleValidation()) {
      const { username, email, phone, address, password } = values;
      const { data } = await axios.post(signupRoute, {
        username,
        email,
        phone,
        address,
        password,
      });

      if (data.status === false) {
        Swal.fire({
          icon: "error",
          title: "Oppss!",
          text: data.msg,
          showConfirmButton: true,
        });
      }
      if (data.status === true) {
        navigate("/", { replace: false });
        Swal.fire({
          icon: "success",
          title: "Yay! 🎉",
          text: "Account created successfully",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }
  }

  function handleValidation() {
    const { username, email, phone, password, cpassword } = values;
    if (password !== cpassword) {
      Swal.fire({ icon: "warning", title: "password missmatched" });
      return false;
    } else if (username.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Oopss!",
        text: "Username must be at least 3 characters long",
      });
      return false;
    } else if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Oopss!",
        text: "Password must be at least 8 characters long",
      });
      return false;
    } else if (email === "") {
      Swal.fire({
        icon: "warning",
        title: "Oopss!",
        text: "Email cannot be empty",
      });
      return false;
    } else if (phone.length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Oopss!",
        text: "Phone number must be 10 characters long",
      });
      return false;
    }
    return true;
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner" style={{ color: "black" }}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setvalues({ ...values, username: e.target.value });
            }}
            value={values.username}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setvalues({ ...values, email: e.target.value });
            }}
            value={values.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={(e) => {
              setvalues({ ...values, address: e.target.value });
            }}
            value={values.address}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Mobile:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            onChange={(e) => {
              setvalues({ ...values, phone: e.target.value });
            }}
            value={values.phone}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setvalues({ ...values, password: e.target.value });
            }}
            value={values.password}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password: </label>
          <input
            type="text"
            name="cpassword"
            id="cpassword"
            onChange={(e) => {
              setvalues({ ...values, cpassword: e.target.value });
            }}
            value={values.cpassword}
            required
          />
        </div>
        <Button id="forSignup" type="submit">
          SIGN UP
        </Button>
        <br />
        <br />
        <Link
          style={{
            color: "dodgerblue",
            cursor: "pointer",
            textDecoration: "none",
          }}
          to="/"
        >
          Already have account
        </Link>
      </div>
    </form>
  );
}

export default Register;

const Button = styled.button`
  display: inline-block;
  padding: 10px 5px;
  border-radius: 8px;
  height: 37px;
  width: 70px;
  background-image: linear-gradient(
    to right,
    #6495ed 50%,
    #00ffff 50%,
    #ee82ee
  );
  background-size: 200%;
  background-position: 0%;
  transition: 0.4s;
  color: #000;
  font-weight: 700;
  cursor: pointer;
`;
