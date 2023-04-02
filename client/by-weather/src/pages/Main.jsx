import React, { useState, useEffect, useMemo, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ko";
import MainSidebar from "./MainInfo/MainSidebar";
import MainContent from "./MainInfo/MainContent";
import "./css/main.css"

function Main(props) {

  const [coords, saveCoords] = useState();
  const [weatherData, setWeatherData] = useState({});

  function handleGeoSucc(position) { // 위치 잡기
    //console.log("postion : " + position);
    const latitude = position.coords.latitude;  // 경도  
    const longitude = position.coords.longitude;  // 위도
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoErr(err) {
    console.log("geo err! " + err);
}

function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
}

const apiKey = "eea57b4d7d7a5c1ab4332cfc01e9a7d1"

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            setWeatherData({
                place: data.name,
                weather: data.weather[data.weather.length - 1].main,
                temp: Math.round((data.main.temp - 273.15).toFixed(1)),
                wind: data.wind.speed,
                rain: data.rain,
                feelsLike: Math.round((data.main.feels_like - 273.15).toFixed(1)),
                icon: (data.weather[0].icon)
            })
        })
}

useEffect(() => {
    requestCoords();
}, []);


  return (
    <> 
    <div className="All" style={{backgroudColor:"#F4F4F5",display: "flex"}}>
    <MainSidebar main={weatherData}/>
    <MainContent main={weatherData}/>
    </div>
    </>
  );
}


export default Main;