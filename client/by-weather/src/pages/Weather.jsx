import React from "react";
import { useLocation } from 'react-router-dom';
import RadarImage from "../component/RadarImage";
import SpecialWeather from "../component/SpecialWeather";
import FindDust from "../component/FindDust";
import '../css/Weather.css'
import DaylightCycle from "../component/DaylightCycle";
import NewsVideio from "../component/NewsVideo";
import CCBYND from '../image/CC BY-ND.png'
import openType from'../image/img_opentype01.jpg';

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
                    <div>
                        <br /> <strong> 공공데이터포털 API 활용</strong> <br/> <br/>
                        <span className="footer_api_names">한국천문연구원_출몰시각 정보</span> <br/>
                        <span className="footer_api_names">한국환경공단_에어코리아_미세먼지 경보 발령 현황</span> <br/>
                        <span className="footer_api_names"> 기상청_기상특보 조회서비스</span> <br/>
                        <span className="footer_api_names">기상청_레이더영상 조회서비스</span> <br/>
                    </div>
                    <div>
                    <img className="CCBYND" src={CCBYND} alt="Description of the image" /> {" "}
                    <img className="openType" src={openType} alt="Description of the image" />

                    </div>
                </div>
            </div>


        </>
    )

}

export default Weather;

