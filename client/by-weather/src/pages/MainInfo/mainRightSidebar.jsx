import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ko";
import axios from "axios";
import '../css/mainRightSidebar.css';

function MainRightSidebar(props) {

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/report/manager`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="RightSidebar">
                <table id="Right_table">
                    <tbody>
                        {data.filter((item) => item.temperature === props.main.temp).map((item) => (
                            <React.Fragment key={item.temperature} >
                                <tr className="Right_span">
                                    <td colSpan={2} className="Right_td">
                                        <span>순위</span>
                                    </td>
                                </tr>
                                {item.fashion_list
                                    .map((fashion) => fashion) // 복사본 만들기
                                    .sort((a, b) => b.count - a.count || a.fashion.localeCompare(b.fashion)) // count가 같으면 이름순으로 정렬
                                    .reduce((acc, fashion) => {
                                        const prev = acc[acc.length - 1];
                                        const rank = prev && prev.count === fashion.count ? prev.rank : acc.length + 1;
                                        return [...acc, { ...fashion, rank }];
                                    }, [])
                                    .map((fashion) => (
                                        <tr key={fashion.fashion}>
                                            <td className="Right_td">{fashion.rank}</td>
                                            <td className="Right_td">{fashion.fashion}</td>
                                        </tr>
                                    ))}
                                <tr></tr> {/* 빈 tr 태그 추가 */}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}


export default MainRightSidebar;
