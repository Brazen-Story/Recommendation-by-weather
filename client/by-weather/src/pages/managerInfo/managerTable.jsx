import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/manager.css"


function managerTable(props) {

  return (
    <>
    <div>
           <table style={{ marginTop: '20px'}}>
          <tbody>
            {props.manager.map((item) => (
              <React.Fragment key={item.temperature} className="m_Table">
                <tr>
                  <td colSpan={3} className="td_temp">
                    <h2 className="td_temp_h2">온도 : {item.temperature}°C</h2>
                  </td>
                </tr>
                <tr className="tr_head">
                  <th>순위</th>
                  <th>패션</th>
                  <th>카운트</th>
                </tr>
                {item.fashion_list.map((fashion, index) => (
                  <tr key={fashion.fashion}>
                    <td>{index + 1}</td>
                    <td>{fashion.fashion}</td>
                    <td>{fashion.count}</td>
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

export default managerTable;