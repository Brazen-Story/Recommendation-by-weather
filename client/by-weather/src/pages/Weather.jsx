import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { villageWeathers } from "../utils/WeatherRoutes";
import RadarImage from "../component/RadarImage";
import SpecialWeather from "../component/SpecialWeather";
import FindDust from "../component/FindDust";
import '../css/Weather.css'
import DaylightCycle from "../component/DaylightCycle";
import NewsVideio from "../component/NewsVideo";

function Weather(props) {

  const location = useLocation();
  const place = location.state?.place;

  return (
    <>
      <div className="wrap">
        <div className="header">
          <div className="header_inner">
            <h2 className="Htitle" style={{ fontFamily: 'Dancing Script' }}>Fashion Diary</h2>
          </div>
        </div>
        <div className="weather_container">
          <div className="root">
            <div className="container_left">
            <p className="tab_title">레이더 영상</p>
              <RadarImage />
            </div>
            <div className="container_right">
              <div>
                <p className="tab_title">기상 속보</p>
                <br></br>
                <SpecialWeather />
                <p className="tab_title">미세먼지 현황</p>
                <br></br>
                <FindDust />
                <br></br>
                <p className="tab_title">일출·일몰</p>
                <DaylightCycle place={place} />
                <br></br>
                <NewsVideio />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Weather;

