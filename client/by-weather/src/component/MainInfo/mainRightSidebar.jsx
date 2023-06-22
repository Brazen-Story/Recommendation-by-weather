import React, { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ko";
import axios from "axios";
import '../../css/mainRightSidebar.css';
import clothesData from '../../json/clothes.json';

function MainRightSidebar(props) {

    const [data, setData] = useState([]);
    const [fashionName, setFashionName] = useState();
    const [AD, setAD] = useState([]);
    const [count, setCount] = useState(1);

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

    const [category, setCategory] = useState('');

    useEffect(() => {

        const firstFashion = data.find((item) => item.temperature === props.main.temp);

        if (firstFashion) {
            setFashionName(firstFashion.fashion_list[0]?.fashion);
        }
    }, [data, props.main.temp]);

    const findCategory = () => {
        for (const categoryName in clothesData) {
            const foundItem = clothesData[categoryName].find(
                (item) => item.value === fashionName
            );
            if (foundItem) {
                setCategory(categoryName);
                break;
            }
        }
    };

    useEffect(() => {
        findCategory();
    }, [fashionName]);

    useEffect(() => {
        if (category) {
            const getAD = async () => {
                const response = await axios.get(`http://localhost:4001/ad/data/${category}`);
                setAD(response.data);
            };
            getAD();
        }
    }, [category]);

    const [Advertising, setAdvertising] = useState({});

    useEffect(() => {
        if (AD && AD.length > 0) {
            const newAdvertising = {
                Url: AD[0].Ad_Image_Url,
                ID: AD[0].Ad_ID,
                Name: AD[0].Ad_Name,
                link: AD[0].Ad_link,
            };
            setAdvertising(newAdvertising);
        } else {
            setAdvertising({});
        }
    }, [AD]);

    const advertisingId = Advertising.ID;

    const link = async () => {
        // setCount(1); // 카운트를 0으로 초기화
        setCount(count + 1); // 카운트를 1씩 증가시킴

        try {
            const response = await axios.post("http://localhost:4001/ad/count", { advertisingId });
            if (response.status === 200) {
                window.open(Advertising.link, '_blank')
            } else {
                return Promise.reject(new Error('server err'))
            }
        } catch (error) {
            console.error(error);
        }
    };

    const buttonRef = useRef(null);

    useEffect(() => {
        if (buttonRef.current && Advertising.ID !== undefined) {
            const imgElement = buttonRef.current.querySelector(".AdImg");
            if (imgElement.complete) {
                sendRequest();
            } else {
                imgElement.addEventListener("load", sendRequest);
            }
        }
    }, [Advertising.ID]);

    const sendRequest = async () => {
        try {
            console.log(advertisingId)
            const response = await axios.post("http://localhost:4001/ad/request", { advertisingId });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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
                            .map((item) => item.fashion_list.slice(0, 5).map((fashion, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className="Right_td">{index + 1}</td>
                                        <td className="Right_td">{fashion.fashion}</td>
                                    </tr>
                                </React.Fragment>
                            )))
                        }
                    </tbody>
                </table>
                <div>
                    <button className="AdBtn" onClick={link} ref={buttonRef}>
                        <div className="AdImgContainer">
                            <img className="AdImg" src={Advertising.Url} />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}


export default MainRightSidebar;
