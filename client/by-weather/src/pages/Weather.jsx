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
                        <h2 className="Htitle" style={{ fontFamily: 'Dancing Script' }}>Today's Weather</h2>
                    </div>
                </div>
                <div className="weather_container clearfix">
                    <div className="container_left">
                        <p className="tab_title">레이더 영상</p>
                        <RadarImage />
                    </div>
                    <div className="container_right">
                        <div>
                            <p className="tab_title">기상 속보</p>
                            <SpecialWeather />
                            <br></br>

                            <p className="tab_title">미세먼지 현황</p>
                            <FindDust />
                            <br></br>
                            <p className="tab_title">일출·일몰</p>
                            <DaylightCycle place={place} />
                            <br></br>
                        </div>
                    </div>
                    <div className="container_bottom">
                        <br></br>
                        <p className="tab_title">날씨 뉴스</p>
                        <NewsVideio />
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>

        </>
    )

}

export default Weather;

