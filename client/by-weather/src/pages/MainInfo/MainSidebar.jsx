import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "moment/locale/ko";
import moment from "moment";
import option from "./clothes.json";
import '../css/mainSidebar.css';
import save from "../image/submit.png";
import menu from "../image/menu.png";

function MainSidebar(props) {

  const [explanation, setExplanation] = useState();
  const [selected, setSelected] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [showAdminButton, setShowAdminButton] = useState(false);

  const navigate = useNavigate();

  const userInfo = JSON.parse(sessionStorage.getItem("username"));
  const nowTime = moment().format("YYYY-MM-DD"); //오늘 날짜 뽑기


  const logOut = () => {
    sessionStorage.removeItem("value");
    navigate("/login");
  };

  function handleCheckboxChange(event) {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setSelected([...selected, checkboxValue]);
    } else {
      setSelected(selected.filter(value => value !== checkboxValue));
    }
  }

  const clothes = selected.join(',');

  const name = userInfo.name;

  const rain = props.main && props.main.rain ? props.main.rain["1h"] : null;

  const byWeather = {
    username: name,           //이름
    date: nowTime,            //날짜
    weather: props.main.weather,         //날씨
    selected: clothes,        //체크박스
    temperature: props.main.temp, // 기온
    explanation: explanation, // 부가설명
    wind: props.main.wind,               // 바람
    rain: rain,               // 강수량
  }

  const submit = async () => {

    const { data } = await axios.post("http://localhost:3001/submit", byWeather)

    if (data.status === false) {
      alert("기입하신 정보를 다시 확인해주세요.");
    }

    if (data.status === true) {
      window.location.reload();
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/data/${name}`)
      setMainData(response.data);
      //console.log(response)

    } catch (error) {
      console.log("hi");
    }
  };

  useEffect(() => {
    getData();
  }, [name]);

  useEffect(() => {
    const sessionStorageValue = userInfo.id;
    setShowAdminButton(sessionStorageValue === 'manager');
  }, []);

  const Manager = () => {
    navigate('/manager');
  }

  const logout = () => {
    sessionStorage.clear();
    navigate('/login')
  }

  const [selectedTab, setSelectedTab] = useState(null);

  const toggleTab = (category) => {
    setSelectedTab(category === selectedTab ? null : category);
  };

  const [showDiv, setShowDiv] = useState(false);

  return (
    <>
      <FormContainer>
        <div class="weather-info">
          <h2 className="Htitle" style={{ fontFamily: 'Dancing Script' }}>Fashion Diary</h2>
          <p className="tab_title">품목</p>
          <div className="App">
            {Object.keys(option).map((category) => (
              <div className="tab" key={category}>
                <button onClick={() => toggleTab(category)} className="tab_btn">{category}</button>
                <div
                  className="options"
                  style={{
                    height: selectedTab === category ? `${option[category].length * 30}px` : 0,
                    overflow: "hidden",
                    transition: "height 0.3s ease-in-out",
                  }}
                >
                  {option[category].map((option) => (
                    <label key={option.value}>
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={selected.includes(option.value)}
                        onChange={handleCheckboxChange}
                      />
                      {option.label}
                      <br />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <br />

          <textarea
            type="text"
            placeholder="부가설명"
            name="부가설명"
            onChange={(e) => setExplanation(e.target.value)}
          />

          <br />

          <button className="btn" id="save_btn" onClick={submit}>
            <img src={save} alt="icon" /> <span> 저장 </span>  </button>

          <div>
          <div className="container">
          {showAdminButton && showDiv && <button className="btn" id="menubtn1" onClick={() => Manager()}>웹 관리</button>}
          {showDiv && <button className="btn" id="menubtn2" onClick={() => logout()}>로그아웃</button>}
          </div>
          <button className="image-button" onClick={() => setShowDiv(!showDiv)}></button>
          </div>

        </div>

      </FormContainer>
    </>

  );
}
const FormContainer = styled.div`
  margin-left: 350px;
  width: 260px;
  height: 100%;
  margin-top: 10px;

  position:fixed;

  

  
`;

export default MainSidebar;