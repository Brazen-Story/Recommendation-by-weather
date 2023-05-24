import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "./css/manager.css";
import Userlist from "./Userlist";
import Datalist from "./Datalist";
import Adlist from "./managerInfo/Adlist";

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
          <button className="manager_btn" onClick={() => handleButtonClick("adlist")}>ad List</button>
        </div>
        {list === "datalist" && <Datalist />}
        {list === "userlist" && <Userlist />}
        {list === "adlist" && <Adlist />}
      </div>
      <button className="home_btn" onClick={() => home()}></button>
    </>
  );
}

export default Manager;
