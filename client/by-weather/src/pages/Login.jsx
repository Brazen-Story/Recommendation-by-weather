import React, { useState } from "react";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { srvlogin } from "../utils/UserRoutes";

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

    const { data } = await axios({
      url: srvlogin, 
      method: "POST",
      withCredentials: true,
      data: {
        id: id,
        password: password,
        phoneNumber: phoneNumber,
      }
    })

    if (data.status === 403) {
      console.log("err")
    }

    if (data.status === true) {
      sessionStorage.setItem("username", JSON.stringify(data.name));
      navigate("/");
    }
  }

  const goResi = () => {
    navigate("/register")
  }


  return (
    <>
      <FormContainer className="FormContainer">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>로그인</h1>
          </div>
          <input
            type="text"
            placeholder="id"
            name="id"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">로그인</button>
          <span>
            회원이 아니신가요? <a onClick={() => goResi()}>회원가입</a>
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
