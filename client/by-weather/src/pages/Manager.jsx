import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Manager() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/manager`)
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const groupedData = data.reduce((groups, item) => {
    const temp = item.temperature;
    if (!groups[temp]) {
      groups[temp] = [];
    }
    groups[temp].push(item);
    return groups;
  }, {});

   const result = Object.keys(groupedData).reduce((acc, key) => {
    const arr = groupedData[key].flatMap(obj => {
      if (typeof obj.fashion === 'string' && obj.fashion.includes(',')) {
        return obj.fashion.split(',');
      } else {
        return [obj.fashion];
      }
    });
    const counts = arr.reduce((count, value) => {
      count[value] = (count[value] || 0) + 1;
      return count;
    }, {});
    const maxCount = Math.max(...Object.values(counts));  //갯수
    const mostCommon = Object.keys(counts).find(key => counts[key] === maxCount); //이름
    const newObj = {
      [key]: {
        mostCommon: mostCommon,
        count: maxCount
      },
    };
    return { ...acc, ...newObj };
  }, {});

  console.log(result)

  const sortedEntries = Object.entries(result).sort(
    (a, b) => b[1].count - a[1].count
  );


  //차트(그래프) 형식으로 데이터 수집한 것을 볼 수 있음.
  //온도에 따른 순위. 온도가 y축 옷들이 x축
  //만약 우선순위가 같다면?
  //테이블?..
  //온도에 따른 통계라서 많은 데이터가 필요한데 없음.
  //옷의 카테고리를 나눠야하나?
  //전체적인 모든 재고의 순위.
  //Recharts
  //https://citylock77.tistory.com/133
  //광고 api

  //배너 노출시간 어떻게 표현 할지. 우선순위에 관하여 정해짐.
  //표

  return (
    <>
      <FormContainer>
      <table>
      <thead>
        <tr>
          <th>기온</th>
          <th>옷</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody>
        {sortedEntries.map(([key, value]) => (
          <tr key={key}>
            <td>{key}°</td>
            <td>{value.mostCommon}</td>
            <td>{value.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`

`;

export default Manager;