import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ko";
import axios from "axios";
import '../css/mainRightSidebar.css';
import Advertising from "../component/Advertising";

function MainRightSidebar(props) {

    const [data, setData] = useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    const [fashionName, setFashionName] = useState('');

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/report/manager`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    // const filteredData = data
    // .filter((item) => item.temperature === props.main.temp)
    // .map((item) => item.fashion_list.map((fashion) => ({
    //   fashion: fashion.fashion,
    // })));
    // 데이터 필터링 및 저장


    useEffect(() => {
        getData();
        //배너 노출 횟수 추가 (함수 호출)
    }, []);


    useEffect(() => {
        const firstFashion = data.find(
            (item) => item.temperature === props.main.temp
        )?.fashion_list[0]?.fashion;

        if (firstFashion) {
            setFashionName(firstFashion);
        }
    }, [data, props.main.temp]);

    console.log(fashionName)

    return (
        <>
            <div className="RightSidebar">
                <table id="Right_table">
                    <tbody>
                        <tr className="Right_span">
                            <td colSpan={2} className="Right_td">
                                <span>순위</span>
                            </td>
                        </tr>
                        {data.filter((item) => item.temperature === props.main.temp)
                            .map((item) => item.fashion_list.map((fashion, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className="Right_td">{index + 1}</td>
                                        <td className="Right_td">{fashion.fashion}</td>
                                    </tr>
                                </React.Fragment>
                            )))}
                    </tbody>
                </table>
                <Advertising data={fashionName} />
            </div>
        </>
    );
}


export default MainRightSidebar;
