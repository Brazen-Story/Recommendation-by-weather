import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AdTable from "../component/AdTable";
import { getData } from "../utils/AdRoutes";
function Adlist() {

    const [AdData, setAdData] = useState([]);
    const [findTemp, setFindTemp] = useState('');
    const [showDiv, setShowDiv] = useState(false);

    const getAdData = async () => {
        try {
            const response = await axios.get(getData);
            setAdData(response.data);
            setShowDiv(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAdData();
    }, []);

    const findData = () => {
        if (findTemp === '') {
            setShowDiv(false);
        } else {
            const filteredData = AdData.filter(item => item.Ad_ID === findTemp);
            setAdData(filteredData);
            setShowDiv(true);
        }
    };

    return (
        <>
            <div className="manager_search">
                <input
                    className="manager_userlist_search"
                    type="text"
                    placeholder="의류"
                    name="temp"
                    value={findTemp}
                    onChange={(e) => setFindTemp(e.target.value)}
                />
                <button className="manager_search_btn" onClick={() => findData()}></button>
                <button className="manager_refresh_btn" onClick={() => getAdData()}></button>
            </div>
            <br />
            <div className={`manager-wrapper${showDiv ? ' show-chart' : ''}`}>
                <div>
                    <AdTable manager={AdData} />
                </div>
            </div>
        </>
    );
}

export default Adlist;

