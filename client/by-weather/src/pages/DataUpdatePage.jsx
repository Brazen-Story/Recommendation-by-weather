import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { json, Link, useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "moment/locale/ko";
import moment from "moment";

function DataUpdatePage() {

  const location = useLocation();
  const dataArray = location.state.dataArray;

  const [selected, setSelected] = useState([]);
  const [explanation,setExplanation] = useState();

  console.log(dataArray)
    //DB 수정
  const UpdateData = async (temperature, name) => {
    try {
      await axios.put(`http://localhost:3001/update/${name}/${temperature}`, { selected, explanation });
      // Do something after successful update
    } catch (error) {
      console.log("hi")
      console.error(error);
      // Handle error
    }
  };

      function handleCheckboxChange(event) {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setSelected([...selected, checkboxValue]);
        } else {
            setSelected(selected.filter(value => value !== checkboxValue));
        }
    }

  return ( //순서
    <>
      <FormContainer>
        <div>
          <textarea
            type="text"
            placeholder="부가설명"
            name="부가설명"
            onChange={(e) => setExplanation(e.target.value)}
          />
          <br />
          <label>
            <input
              type="checkbox"
              value="Option 1"
              checked={selected.includes("Option 1")}
              onChange={handleCheckboxChange}
            />
            Option 1
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Option 2"
              checked={selected.includes("Option 2")}
              onChange={handleCheckboxChange}
            />
            Option 2
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Option 3"
              checked={selected.includes("Option 3")}
              onChange={handleCheckboxChange}
            />
            Option 3
          </label>
          <br />
          <button onClick={()=>UpdateData(dataArray[0], dataArray[1])}>수정</button>
        </div>

      </FormContainer>
    </>

  );
}
const FormContainer = styled.div`
overflow: hidden;
min-width: auto;
top: 0px;
bottom: 0px;
left: 0px;
right: 0px;
margin-top: 55px;
li {
    margin-top : 10px;
    padding: 10px;
    border : solid 1px;
}


  `;
export default DataUpdatePage;