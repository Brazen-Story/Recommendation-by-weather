import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/managerChart.css"


function managerChart(props) {

    return (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {props.manager.map((item) => (
              <div className="Chart" key={item.temperature} style={{ height: '300px', marginBottom: '30px' , width: '800px'}}>
                <ResponsiveContainer minHeight={300}>
                  <LineChart
                    data={item.fashion_list}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fashion" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </>
      );
    }

export default managerChart;

