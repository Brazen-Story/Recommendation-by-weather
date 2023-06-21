import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../css/Userlist.css"

function Userlist() {

  const [Userdata, setUserData] = useState([]);
  const [findTemp, setFindTemp] = useState(''); // 검색어

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://52.78.164.171:3001/user/user/manager`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleSearch = () => {
    if (findTemp) {
      const filteredData = Userdata.filter(user => user.name.includes(findTemp));
      setUserData(filteredData);
    } else {
      getUserData();
    }
  }

  return (
    <>
      <div className="manager_search">
        <input className="manager_userlist_search" type="text" placeholder="닉네임" name="temp" onChange={(e) => setFindTemp(e.target.value)} />
        <button className="manager_search_btn" onClick={handleSearch}></button>
        <button className="manager_refresh_btn" onClick={getUserData}></button>
      </div>
      <table className="managerTable">
        <thead>
          <tr className="tr_head">
            <th>아이디</th>
            <th>닉네임</th>
            <th>기록 수</th>
            <th>가입일자</th>
          </tr>
        </thead>
        <tbody>
          {Userdata.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.join_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Userlist;

