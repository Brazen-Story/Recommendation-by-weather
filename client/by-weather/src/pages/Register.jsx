import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

//   var today = new Date();

//   var year = today.getFullYear();
//   var month = ('0' + (today.getMonth() + 1)).slice(-2);
//   var day = ('0' + today.getDate()).slice(-2);

//   var dateString = year + '-' + month  + '-' + day;

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHoveer: true,
    draggable: true,
    theme: "dark",
  };

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

const handleSubmit = async(event) => {

  event.preventDefault();

  console.log({
    username: username,
    id: id,
    password: password,
    phoneNumber: phoneNumber,
  })

  axios.post("http://localhost:3001/create", {
    username: username,
    id: id,
    password: password,
    phoneNumber: phoneNumber,
  }).then(navigate("/login"))
}

  // const handleValidation = () => {
  //   const { password, confirmPassword, username, email } = values;
  //   if (password !== confirmPassword) {
  //     toast.error(
  //       "password and confirm password should be same.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (username.length < 3) {
  //     toast.error("Username should be greater than 3 charcters", toastOptions);
  //     return false;
  //   } else if (password.length < 8) {
  //     toast.error(
  //       "password shouldbe equal or greater than 8 charters",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (email === "") {
  //     toast.error("email is required", toastOptions);
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <>
      <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="id"
            name="id"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="phoneNumber"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  background-color: black;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    border: solid 1px white;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;