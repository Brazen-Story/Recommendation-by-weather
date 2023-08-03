import React, { useState, useEffect } from "react";
import axios from "axios";
import { changedName } from "../utils/ReportRoutes";
import sunriseImage from '../image/sunrise.png';
import sunsetImage from '../image/sunset.png';
import '../css/daylightcycle.css'
import { ligthCycleURL } from "../utils/WeatherRoutes";

function DaylightCycle(props) {

    const [locationKoreanName, setLocationKoreanName] = useState("");
    const [data, setData] = useState({});

    const changeLocationName = async () => {

        const response = await axios({
            url: changedName,
            method: "POST",
            withCredentials: true,
            data: {
                place: props.place,
            }
        })

        setLocationKoreanName(processName(response.data[0].Korean));
    }

    useEffect(() => {
        changeLocationName();
    }, [])

    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios({
                    url: ligthCycleURL,
                    method: "POST",
                    withCredentials: true,
                    data: {
                        place: locationKoreanName,
                    }
                })
                setData(response.data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (locationKoreanName) { // locationKoreanName이 존재할 때만 fetchData를 실행합니다.
            fetchData();
        }
    }, [locationKoreanName]); // 의존성 배열에 locationKoreanName을 추가합니다

    function processName(locationKoreanName) {
        if (locationKoreanName.length === 3) {
            return locationKoreanName.slice(0, 2);
        } else if (locationKoreanName.includes("(") && locationKoreanName.includes(")")) {
            return locationKoreanName.split("(")[1].split(")")[0];
        } else if (locationKoreanName.length === 4) {
            return "서울";
        } else {
            return locationKoreanName;
        }
    }

    const formatTime = (timeStr) => {
        return timeStr.slice(0, 2) + " : " + timeStr.slice(2);
    }

    return (
        <>
        <div className="twoState">
            <div className="oneState">
                <img src={sunriseImage} alt="sunrise" className="oneDetailState" />
                <p>{data.sunrise ? formatTime(data.sunrise) : 'Loading...'}</p>
            </div>
            <div className="oneState">
                <img src={sunsetImage} alt="sunset" className="oneDetailState" />
                <p>{data.sunrise ? formatTime(data.sunset) : 'Loading...'}</p>
            </div>
        </div>

        </>
    )
}
export default DaylightCycle;