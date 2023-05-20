import React, { useState, useEffect } from "react";
import clothesData from '../json/clothes.json';
import axios from "axios";

function Advertising() {

  // console.log(props.fashionName)
  // const [category, setCategory] = useState('');
  // const [AD, setAD] = useState([]);

  // useEffect(() => {
  //   const findCategory = () => {
  //     for (const categoryName in clothesData) {
  //       const foundItem = clothesData[categoryName].find(
  //         (item) => item.value === props.fashionName
  //       );
  //       if (foundItem) {
  //         setCategory(categoryName);
  //         break;
  //       }
  //     }
  //   };

  //   findCategory();
  // }, [props.fashionName]);


  // useEffect(() => {
  //   const getAD = async () => {
  //     const response = await axios.get(`http://localhost:4001/ad/data/${category}`)
  //     setAD(response.data);
  //   }

  //   getAD();
  // }, [category]);


  // console.log(AD)
  // console.log(props.fashionName);
  // const [category, setCategory] = useState('');
  // const [AD, setAD] = useState([]);

  // useEffect(() => {
  //   const findCategory = () => {
  //     for (const categoryName in clothesData) {
  //       const foundItem = clothesData[categoryName].find(
  //         (item) => item.value === props.fashionName
  //       );
  //       if (foundItem) {
  //         setCategory(categoryName);
  //         break;
  //       }
  //     }
  //   };

  //   findCategory();
  // }, [clothesData, props.fashionName]);


  // useEffect(() => {
  //   const getAD = async () => {
  //     const response = await axios.get(`http://localhost:4001/ad/data/${category}`)
  //     setAD(response.data);
  //   };

  //   if (category) {
  //     getAD();
  //   }
  // }, [category]);
  // const [data, setData] = useState([]);
  // const [fashionName, setFashionName] = useState('');

  // const getData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/report/manager`);
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // useEffect(() => {
  //   const firstFashion = data.find(
  //     (item) => item.temperature === props.main.temp
  //   )?.fashion_list[0]?.fashion;

  //   if (firstFashion) {
  //     setFashionName(firstFashion);
  //   }
  // }, [data, props.main.temp]);



  return (
    <>
      {/* <button onClick={link}>
        <img src={imageUrl} alt="Image" />  
      </button> */}

    </>
  );
}

export default Advertising;


