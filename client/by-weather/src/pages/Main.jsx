import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ko";
import MainLeftSidebar from "../component/MainInfo/MainLeftSidebar";
import MainContent from "../component/MainInfo/MainContent";
import MainRightSidebar from "../component/MainInfo/mainRightSidebar";
import "../css/main.css"
import axios from "axios";
import { useInterval } from 'usehooks-ts'
import { maintainLogged } from "../utils/UserRoutes";

function Main(props) {

  const [coords, saveCoords] = useState();
  const [weatherData, setWeatherData] = useState({});
  const [isPlaying, setPlaying] = useState(false)

  const navigate = useNavigate();

  function handleGeoSucc(position) {  // geolocation API를 이용하여 현재 위치를 가져오는데 성공했을 때 호출되는 함수입니다.
    const latitude = position.coords.latitude;  // 경도  
    const longitude = position.coords.longitude;  // 위도
    const coordsObj = {
      latitude,
      longitude
    }
    saveCoords(coordsObj); // 현재 위치의 좌표 데이터를 업데이트합니다.
    getWeather(latitude, longitude); // 현재 위치의 날씨 데이터를 가져옵니다
  }

  function handleGeoErr(err) {  // geolocation API를 이용하여 현재 위치를 가져오는데 실패했을 때 호출되는 함수입니다.
    console.log("geo err! " + err); // 에러 메시지를 콘솔에 출력합니다.
  }

  function requestCoords() { // geolocation API를 이용하여 현재 위치를 가져오는 함수입니다.
    // geolocation API를 호출하고, 성공시 handleGeoSucc 함수를, 실패시 handleGeoErr 함수를 호출합니다.
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.rain && data.rain['1h']) {
          setWeatherData({
            place: data.name,
            weather: data.weather[data.weather.length - 1].main,
            temp: Math.round((data.main.temp - 273.15).toFixed(1)),
            wind: data.wind.speed,
            rain: data.rain['1h'],
            feelsLike: Math.round((data.main.feels_like - 273.15).toFixed(1)),
            icon: (data.weather[0].icon)
          });
        } else {
          setWeatherData({
            place: data.name,
            weather: data.weather[data.weather.length - 1].main,
            temp: Math.round((data.main.temp - 273.15).toFixed(1)),
            wind: data.wind.speed,
            feelsLike: Math.round((data.main.feels_like - 273.15).toFixed(1)),
            icon: (data.weather[0].icon)
          });
        }
      })
  }

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("username")) === null){
      navigate('/login');
    }
    requestCoords();
  }, []);

  useInterval(
    () => {
      refreshToken();
    },
    isPlaying ? 59 * 60 * 1000 : null,
  );

  const refreshToken = () => {
    axios({
      url: maintainLogged,
      method: "GET",
      withCredentials: true,
    });
  }

  return (
    <>
      <div className="All" style={{ backgroudColor: "#F4F4F5", display: "flex" }}>
        <MainLeftSidebar main={weatherData} />
        <MainContent main={weatherData} />
        <MainRightSidebar main={weatherData} />
      </div>
    </>
  );
}

export default Main;