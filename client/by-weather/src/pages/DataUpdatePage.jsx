import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "moment/locale/ko";
import option from "./json/clothes.json";
import "../css/DataUpdatePage.css"


function DataUpdatePage() {

  const location = useLocation();
  const navigate = useNavigate();

  const dataArray = location.state.dataArray;
  console.log(dataArray)

  const [selected, setSelected] = useState([]);
  const [explanation, setExplanation] = useState();

  console.log(dataArray[0].name)
  console.log(dataArray[0].temperature)
  console.log(dataArray[0].wind)

  //DB 수정
  const UpdateData = async (name, temperature, wind) => {
    try {
      const data = {
        selected: selected,
        explanation: explanation,
      };
      await axios.put(`http://52.78.164.171:3001/report/update/${name}/${temperature}/${wind}`, data);
      navigate('/');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  function handleCheckboxChange(event) {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setSelected([...selected, checkboxValue]);
    } else {
      setSelected(selected.filter(value => value !== checkboxValue));
    }
  }

  return ( //순서
    <>
      <div>
        <h2 className="Htitle" style={{ fontFamily: 'Dancing Script' }}>Fashion Diary</h2>
        <div className="update_title">
          {dataArray.map((item, index) => (
            <div key={index}>
              <p className="update_weatherData">
                선택한 정보 : {" | "}
                {item.name} {" | "}
                {item.state}{" | "}
                {item.temperature}°C{" | "}
                {dataArray.rain === undefined ? null : "강수량 : " + dataArray.rain + " | "}
                {item.wind}m/s{" | "}
                {item.fashion}{" | "}
                {item.date}
              </p>
            </div>
          ))}
        </div>
        <br />
        {Object.keys(option).map((category) => (
              <div className="tab" key={category}>
                <span className="update_span">{category}</span>
                <hr />
                <div className="update_options">
                  {option[category].map((option) => (
                    <label key={option.value} className="update_label">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={selected.includes(option.value)}
                        onChange={handleCheckboxChange}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
        <br />
        <textarea
          type="text"
          placeholder="부가설명"
          name="부가설명"
          className="update_area"
          onChange={(e) => setExplanation(e.target.value)}
        />
        <br />
        <br />
        <button onClick={() => UpdateData(dataArray[0].name, dataArray[0].temperature, dataArray[0].wind)} className="update_btn">
          <span>
            수정
          </span>
        </button>
        <button className="update_btn" id="back_btn" onClick={() => navigate("/")}>
          <span>
            돌아가기
          </span>
        </button>
      </div>

    </>

  );
}

export default DataUpdatePage;