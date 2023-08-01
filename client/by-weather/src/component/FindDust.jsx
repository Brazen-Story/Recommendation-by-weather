import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/finddust.css'
const FindDust = () => {

  const [findDust, setFindDust] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/weather/finddust');
        setFindDust(response.data)
        if (findDust.length === 0) {
          setState("공기질 좋음");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='dust'>
        {state}
      </div>
    </>
  )
}

export default FindDust;