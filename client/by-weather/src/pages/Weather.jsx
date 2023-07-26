import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { villageWeathers } from "../utils/WeatherRoutes";
import RadarImage from "../component/RadarImage";
import SpecialWeather from "../component/SpecialWeather";
import FindDust from "../component/FindDust";
import '../css/Weather.css'

function Weather() {
  //미세먼지
  //날씨
  //날씨 관련 뉴스


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
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Weather;

