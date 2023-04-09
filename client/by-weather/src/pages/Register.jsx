import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

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

  axios.post("http://localhost:3001/user/create", {
    username: username,
    id: id,
    password: password,
    phoneNumber: phoneNumber,
  }).then(navigate("/login"))
}

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
  background-color: #F4F4F5;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    margin-right : 5%;
    margin-left : 5%;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      text-transform: uppercase;
    }
  }
  form {
    border: solid 1px #C9C9CA;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    padding: 1rem;
    border: 0.1rem solid #C9C9CA;
    border-radius: 0.4rem;
    width: 88%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #C9C9CA;
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
      background-color: #a0a0a2;
    }
  }
  span {
    text-transform: uppercase;
    a {
      text-decoration: none;
      font-weight: bold;
    }
    a:hover {
      cursor: pointer;
    }
  }
`;

export default Register;