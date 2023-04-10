import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./css/manager.css";
import ManagerChart from "./managerInfo/managerChart"
import ManagerTable from "./managerInfo/managerTable"


function Manager() {

  const [data, setData] = useState([]);
  const [findTemp, setFindTemp] = useState(''); // 검색어

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/report/manager`);
      setData(response.data);
      setShowDiv(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const findData = () => {
    if (findTemp === '') {

      setShowDiv(false);
    } else {
      const filteredData = data.filter(item => item.temperature === parseInt(findTemp));
      setData(filteredData);
      setShowDiv(true);
    }
  };

  //새로고침은 안보이게
  //만약 input에 값이 있으면 차트가 보이게 input에 값이 없으면 안보이게
  //

  const [showDiv, setShowDiv] = useState(false);


  return (
    <>
      <div>
        <h2 className="Htitle" style={{ fontFamily: 'Dancing Script' }}>Fashion Diary</h2>
        <div className="manager_search">
          <input className="manager_search_input" type="text" placeholder="온도" name="temp" onChange={(e) => setFindTemp(e.target.value)} />
          <button className="manager_search_btn" onClick={() => findData()}></button>
          <button className="manager_refresh_btn" onClick={() => getData()}></button>
        </div>
        <div className={`manager-wrapper${showDiv ? ' show-chart' : ''}`}>
        <div className="manager-table">
          <ManagerTable manager={data} />
        </div>
        <div className="manager-chart">
          {showDiv && <ManagerChart manager={data} />}
        </div>
      </div>
      </div>
    </>
  );
}


export default Manager;
