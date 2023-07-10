//https://www.data.go.kr/iim/api/selectAPIAcountView.do
//압축폴더 있음.
//활용신청했음
import React, { useState, useEffect } from "react";
import axios from 'axios'

const WthrWrnInfo = () => {

    const [specialReports, setSpecialReports] = useState([]);

    const getWthrBrkNews = async () => {
        const response = await axios.get('http://localhost:3001/weather/WthrWrnInfoService')
        setSpecialReports(response.data);
    }

    useEffect(() => {
        getWthrBrkNews();
    }, [])

    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hour = String(dateTime.getHours()).padStart(2, '0');
        const minute = String(dateTime.getMinutes()).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    };

    const extractTextAfterSlash = (text) => {
        const index = text.indexOf('/');
        if (index !== -1) {
            return text.slice(index + 1).trim();
        }
        return text.trim();
    };

    //tmfc로 날짜 시간 나눠서 보여주기

    //title 자동으로 다음페이지 넘어가는 느낌으로

    return (
        <>
            <div>
                {specialReports.map((report, index) => (
                    <div key={index}>
                        <p>{extractTextAfterSlash(report.title)}</p>
                        <p>{formatDateTime(report.tmFc)}</p>
                    </div>
                ))}
            </div>
        </>
    )

}

export default WthrWrnInfo;