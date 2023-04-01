import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../css/mainHeader.css"

function MainHeader() {

  const [showAdminButton, setShowAdminButton] = useState(false);

  const navigate = useNavigate();

  const userInfo = JSON.parse(sessionStorage.getItem("username"));


  const Manager = () => {
    navigate('/manager');
  }

  const logOut = () => {
    sessionStorage.removeItem("value");
    navigate("/login");
  };

  useEffect(() => {
    const sessionStorageValue = userInfo.id;
    setShowAdminButton(sessionStorageValue === 'manager');
  }, []);

  return (
    <>
{/* 
        <button onClick={logOut} className="Hbtn">logOut</button>

        {showAdminButton && <button  className="Hbtn" onClick={() => Manager()}>웹 관리</button>} */}


      <ToastContainer />
    </>
  );
}

export default MainHeader;