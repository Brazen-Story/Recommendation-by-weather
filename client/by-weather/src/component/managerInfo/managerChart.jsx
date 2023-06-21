import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../../css/managerChart.css"

function managerChart(props) {

    return (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {props.manager.map((item) => (
              <div className="Chart" key={item.temperature} style={{ height: '300px', marginBottom: '30px' , width: '900px'}}>
                <ResponsiveContainer minHeight={300}>
                  <LineChart
                    data={item.fashion_list}
                    margin={{
                      top: 5, right: 30, left: 0, bottom: 5,
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

