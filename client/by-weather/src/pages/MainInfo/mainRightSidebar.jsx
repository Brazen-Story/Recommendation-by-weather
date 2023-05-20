import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ko";
import axios from "axios";
import '../css/mainRightSidebar.css';
import Advertising from "../component/Advertising";
import clothesData from '../json/clothes.json';

function MainRightSidebar(props) {

    const [data, setData] = useState([]);
    const [fashionName, setFashionName] = useState();
    const [AD, setAD] = useState([]);
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
        //배너 노출 횟수 추가 (함수 호출)
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

    const Advertising = {
        Url: AD[0].Ad_Image_Url,
        ID: AD[0].Ad_ID,
        Name: AD[0].Ad_Name,
        link: AD[0].Ad_link,
    }

    console.log(Advertising.Url)

    const link = () => {
        window.open(Advertising.link, '_blank');
    }


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
                {/* <button onClick={link}>
                    <img src={Advertising.Url}  />
                </button> */}
            </div>
        </>
    );
}


export default MainRightSidebar;
