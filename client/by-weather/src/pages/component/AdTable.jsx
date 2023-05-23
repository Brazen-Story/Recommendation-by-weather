import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/managerChart.css"


function AdTable(props) { //AdTable의 Top이 추가되는 Err
    console.log(props.manager)
    const formatDateTime = (datetimeString) => {
        const datetime = new Date(datetimeString);
        const formattedDatetime = datetime.toISOString().replace("T", " ").slice(0, 19);
        return formattedDatetime;
    };
    return (
        <>
      <table className="managerTable">
                <thead>
                <tr className="tr_head">
                        <th>Ad_ID</th>
                        <th>Ad_Click_Count</th>
                        <th>Click_Revenue</th>
                        <th>Impression_Time</th>
                        <th>Impression_Count</th>
                        <th>Impression_Revenue</th>
                        <th>Click_Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.manager.map((item, index) => (
                        <tr key={`${item.Ad_ID}_${index}`}>
                            <td>{item.Ad_ID}</td>
                            <td>{item.Impression_Count}</td>
                            <td>{item.Impression_Revenue}</td>
                            <td>{formatDateTime(item.Impression_Time)}</td>
                            <td>{item.Ad_Click_Count}</td>
                            <td>{item.Click_Revenue}</td>
                            <td>{formatDateTime(item.Click_Time)}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default AdTable;

