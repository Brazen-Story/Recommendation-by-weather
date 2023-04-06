import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHoveer: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    id: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const { password, id, phoneNumber } = values;

    const { data } = await axios.post("http://localhost:3001/login", {
      id,
      password,
      phoneNumber,
    })

    if (data.status === false) {
      console.log("err")
    }

    const userInfo = data.result[0];

    if (data.status === true){
      sessionStorage.setItem("username", JSON.stringify(userInfo));
      navigate("/");
    }

  }

  const goResi = () => {
    navigate("/register")
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Sgin In</h1>
          </div>
          <input
            type="text"
            placeholder="id"
            name="id"
            // onChange={(e) => setId(e.target.value)}
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            // onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login In</button>
          <span>
            Don't have an account? <a onClick={() => goResi()}>Register</a>
          </span>
          <br />
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
    margin-right : 5%;
    margin-left : 5%;
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

export default Login;
