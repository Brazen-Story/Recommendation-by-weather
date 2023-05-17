import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./css/manager.css";
import Userlist from "./Userlist";
import Datalist from "./Datalist";

//유저 정보 가져오기

function Manager() {

  const { list } = useParams();

  const navigate = useNavigate();

  const handleButtonClick = (list) => {
    navigate(`/manager/${list}`);
  };

  const home = () => {
    navigate('/')
  }

  return (
    <>
      <div className="Manager">
        <h2 className="Htitle" style={{ fontFamily: 'Dancing Script' }}>Fashion Diary</h2>
        <div className="button-container">
          <button className="manager_btn" onClick={() => handleButtonClick("datalist")}>Data List</button>
          <button className="manager_btn" onClick={() => handleButtonClick("userlist")}>User List</button>
        </div>
        {list === "datalist" && <Datalist />}
        {list === "userlist" && <Userlist />}
      </div>

      <button className="home_btn" onClick={()=>home()}></button>
    </>
  );
}

export default Manager;
