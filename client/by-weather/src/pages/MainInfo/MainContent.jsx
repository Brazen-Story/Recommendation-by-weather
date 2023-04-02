import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "moment/locale/ko";
import "../css/mainContent.css"
import edit from "../image/edit.png";
import del from "../image/delete.png";

function MainContent(props) {

    const [selected, setSelected] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [moveData, setMoveData] = useState([0, 0]);

    const navigate = useNavigate();

    const userInfo = JSON.parse(sessionStorage.getItem("username"));

    const deleteItem = async (temperature, name, date) => {

        await axios.delete(`http://localhost:3001/deleteItem/${name}/${temperature}/${date}`);
        const response = await axios.get(`http://localhost:3001/data/${name}`);
        setMainData(response.data);

    }

    function handleCheckboxChange(event) {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setSelected([...selected, checkboxValue]);
        } else {
            setSelected(selected.filter(value => value !== checkboxValue));
        }
    }

    const name = userInfo.name;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/data/${name}`)
                setMainData(response.data);
            } catch (error) {
                console.log("데이터 수집 오류");
            }
        };
        getData();
    }, [name]);

    const dataMove = (a, b) => { //수정
        setMoveData([a, b]);
    }

    useEffect(() => {
        if (moveData[0] !== 0) {
            navigate("/DataUpdatePage", { state: { dataArray: moveData } });
        }
    }, [moveData, navigate]);

    return ( //순서
        <>
            <FormContainer>
                <div className="All">
                    <div className="title">
                        <p className="weatherData">
                            {props.main.place}{" : "}
                            기온 : {props.main.temp}°C{" | "}
                            체감 : {props.main.feelsLike}°C{" | "}
                            {props.main.rain === undefined ? null : "강수량 : " + props.main.rain + " | "}
                            {props.main.weather}{" | "}
                            {props.main.wind}m/s
                        </p>
                        <img src={`http://openweathermap.org/img/wn/${props.main.icon}@2x.png`} alt="weather icon" className="icon"></img>
                    </div>
                    {mainData.length > 0 && (
                        <ul>
                            {mainData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, index) => (<li key={index.id}>
                                기온 : {item.temperature}°C<br />
                                날짜 : {item.date}<br />
                                날씨 : {item.state}<br />
                                옷 : {item.fashion.replace(",", ", ")}<br />
                                <div className="double_btn">
                                    <button className="body_btn" onClick={() => dataMove(item.temperature, item.name)}>
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