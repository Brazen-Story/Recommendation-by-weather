import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ManagerTable from "./managerInfo/managerTable"
import ManagerChart from "./managerInfo/managerChart"
import { managerPage } from "../utils/ReportRoutes";

function Datalist() {

    const [Reportdata, setReportData] = useState([]);
    const [findTemp, setFindTemp] = useState(''); // 검색어
    const [showDiv, setShowDiv] = useState(false);

    const getReportData = async () => {
        try {
            const response = await axios.get(`${managerPage}`);
            setReportData(response.data);
            setShowDiv(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReportData();
    }, []);

    const findData = () => {
        if (findTemp === '') {
            setShowDiv(false);
        } else {
            const filteredData = Reportdata.filter(item => item.temperature === parseInt(findTemp));
            setReportData(filteredData);
            setShowDiv(true);
        }
    };

    return (
        <>
            <div className="manager_search">
                <input
                    className="manager_userlist_search"
                    type="text"
                    placeholder="기온"
                    name="temp"
                    value={findTemp}
                    onChange={(e) => setFindTemp(e.target.value)}
                />
                <button className="manager_search_btn" onClick={() => findData()}></button>
                <button className="manager_refresh_btn" onClick={() => getReportData()}></button>
            </div>
            <div className={`manager-wrapper${showDiv ? ' show-chart' : ''}`}>
                <div className="manager-table">
                    <ManagerTable manager={Reportdata} />
                </div>
                <div className="manager-chart">
                    {showDiv && <ManagerChart manager={Reportdata} />}
                </div>
            </div>
        </>
    );
}

export default Datalist;

