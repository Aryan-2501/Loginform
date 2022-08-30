import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { loginRoute } from "../Utils/APIRoutes";

function LoginForm({ Login, error, SetError }) {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isButton, setisButton] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isButton) {
      if (handleValidation()) {
        const { username, password, email } = details;
        const { data } = await axios.post(loginRoute, {
          username,
          email,
          password,
        });

        if (data.status === false) {
          sessionStorage.setItem("auth", "false");
          Swal.fire({
            icon: "error",
            title: "Oppss!",
            text: data.msg,
            timer: 1500,
            showConfirmButton: false,
          });
        }
        if (data.status === true) {
          let allData = data.user;

          localStorage.setItem("username", allData.username);
          localStorage.setItem("email", allData.email);
          localStorage.setItem("address", allData.address);
          localStorage.setItem("phone", allData.phone);

          sessionStorage.setItem("auth", "true");
          navigate("/home", { replace: false });
        }
      }
    } else {
      handleSignup();
    }
  };

  function handleValidation() {
    const { username, password } = details;
    if (username === "") {
      Swal.fire({
        icon: "warning",
        title: "Oopss!",
        text: "Username or Email is required",
        timer: 1500,
        showConfirmButton: false,
      });
      return false;
    } else if (password === "") {
      Swal.fire({
        icon: "warning",
        title: "Oopss!",
        text: "Password is required",
        timer: 1500,
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  }

  function handleSignup(e) {
    navigate("/signup", { replace: false });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner" style={{ color: "black" }}>
        <h2>Login</h2>
        {error !== "" ? <div className="error">{error}</div> : <div>{""}</div>}
        <div className="form-group">
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setDetails({ ...details, username: e.target.value });
            }}
            value={details.username}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
            // required
          />
        </div>
        <input
          id="forLogin"
          onClick={() => {
            setisButton(true);
          }}
          type="submit"
          value="LOGIN"
        />
        &nbsp;
        <Button id="forSignup" onClick={() => setisButton(false)}>
          SIGN UP
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;

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
