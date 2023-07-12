import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { villageWeathers } from "../utils/WeatherRoutes";
import RadarImage from "../component/RadarImage";
import SpecialWeather from "../component/SpecialWeather";
import FindDust from "../component/FindDust";

function Weather() {
  //미세먼지
  //날씨
  //날씨 관련 뉴스
  

  return (
    <>
      <RadarImage />
      <SpecialWeather />
      <FindDust />
    </>
  )

}

export default Weather;

