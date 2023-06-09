import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "moment/locale/ko";
import "../../css/mainContent.css"
import edit from "../../image/edit.png";
import del from "../../image/delete.png";
import { deleteReport, getReportsByName, findtemp, changedName, weatherChangedName } from "../../utils/ReportRoutes";

function MainContent(props) {

    const [selected, setSelected] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [moveData, setMoveData] = useState([0, 0]);
    const [findTemp, setFindTemp] = useState("");
    const [locationKoreanName, setLocationKoreanName] = useState("");
    const [WeatherKoreanName, setWeatherKoreanName] = useState("");

    const navigate = useNavigate();

    const name = JSON.parse(sessionStorage.getItem("username"));

    const deleteItem = async (temperature, name, date) => {

        await axios.delete(`${deleteReport}/${name}/${temperature}/${date}`);
        const response = await axios.get(`${getReportsByName}/${name}`);
        setMainData(response.data);

    }

    const findData = async () => { //없는 데이터를 찾으려고 하는 경우 알려줘야함.
        try {
            const response = await axios.get(`${findtemp}/${name}/${findTemp}`)
            setMainData(response.data);
        } catch (error) {
            console.log("데이터 수집 버튼 오류")
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get(`${getReportsByName}/${name}`)
            setMainData(response.data);
        } catch (error) {
            console.log("데이터 수집 오류");
        }
    };

    const dataMove = (item) => { //수정
        setMoveData([item]);
    }

    const changeLocationName = async () => {

        const response = await axios({
            url: changedName,
            method: "POST",
            withCredentials: true,
            data: {
                place: props.main.place,
            }
        })

        setLocationKoreanName(response.data[0].Korean)
    }

    const changeWeatherName = async () => {

        const response = await axios({
            url: weatherChangedName,
            method: "POST",
            withCredentials: true,
            data: {
                weather: props.main.weather
            }
        })

        setWeatherKoreanName(response.data[0].Korean)
    }


    useEffect(() => {
        if (moveData[0] !== 0) {
            navigate("/DataUpdatePage", { state: { dataArray: moveData } });
        }
    }, [moveData, navigate]);

    useEffect(() => {
        getData();
        if (props.main.place && props.main.weather) {
            changeLocationName();
            changeWeatherName();
        }
    }, [name, props.main.place, props.main.weather]);

    function handleCheckboxChange(event) {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setSelected([...selected, checkboxValue]);
        } else {
            setSelected(selected.filter(value => value !== checkboxValue));
        }
    }

    return ( //순서
        <>
            <FormContainer>
                <div className="All">
                    <div className="title">
                        <p className="weatherData">
                            {locationKoreanName}{" : "}
                            기온 : {props.main.temp}°C{" | "}
                            체감 : {props.main.feelsLike}°C{" | "}
                            {props.main.rain === undefined ? null : "강수량 : " + props.main.rain + " | "}
                            {WeatherKoreanName}{" | "}
                            {props.main.wind}m/s
                        </p>
                        <img src={`http://openweathermap.org/img/wn/${props.main.icon}@2x.png`} alt="weather icon" className="icon"></img>
                    </div>
                    <div className="search">
                        <input className="search_input" type="text" placeholder="온도" name="temp" onChange={(e) => setFindTemp(e.target.value)} />
                        <button className="search_btn" onClick={() => findData()}></button>
                        <button className="refresh_btn" onClick={() => getData()}></button>
                    </div>
                    {mainData.length > 0 && (
                        <ul>
                            {mainData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, index) => (<li key={index.id}>
                                기온 : {item.temperature}°C<br />
                                날짜 : {item.date}<br />
                                날씨 : {item.state}<br />
                                옷 : {item.fashion.replace(",", ", ")}<br />
                                <div className="double_btn">
                                    <button className="body_btn" onClick={() => dataMove(item)}>
                                        <img src={edit} alt="icon" /> <span> 수정 </span>  </button>
                                    {" "}
                                    <button className="body_btn" onClick={() => deleteItem(item.temperature, item.name, item.date)}>
                                        <img src={del} alt="icon" /> <span> 삭제 </span> </button>
                                </div>
                            </li>
                            ))}
                        </ul>
                    )}
                </div>
            </FormContainer>
        </>
    );
}

const FormContainer = styled.div`
display: flex;
justifyContent: flex-end;
overflow: hidden;
min-width: auto;
top: 0px;
bottom: 0px;
left: 0px;
right: 0px;
margin-top: 10px;
margin-left: auto;
margin-right: auto;
li {
    margin-bottom : 10px;
    padding: 10px;
}
`;

export default MainContent;