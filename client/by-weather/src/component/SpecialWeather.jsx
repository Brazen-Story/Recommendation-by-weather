import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars';
import '../css/wthrwrninfo.css'
import { WthrWrnInfoURL } from "../utils/WeatherRoutes";
const WthrWrnInfo = () => {

    const [specialReports, setSpecialReports] = useState([]);

    const getWthrBrkNews = async () => {
        const response = await axios.get(WthrWrnInfoURL)
        setSpecialReports(response.data);
    }

    useEffect(() => {
        getWthrBrkNews();
    }, [])

    function formatDateTime(dateTimeStr) {
        const str = String(dateTimeStr);
        const year = str.slice(0, 4);
        const month = str.slice(4, 6);
        const day = str.slice(6, 8);
        const hour = str.slice(8, 10);
        const minute = str.slice(10, 12);
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    }
    const extractTextAfterSlash = (text) => {
        const index = text.indexOf('/');
        if (index !== -1) {
            return text.slice(index + 1).trim();
        }
        return text.trim();
    };

    return (
        <>
            <Scrollbars style={{ height: 120 }}>
                {specialReports.map((report, index) => (
                    <div key={index} className="info">
                        <p>{extractTextAfterSlash(report.title)}</p>
                        <p>{formatDateTime(report.tmFc)}</p>
                    </div>
                ))}
            </Scrollbars>
        </>
    )
}

export default WthrWrnInfo;
