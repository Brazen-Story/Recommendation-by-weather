  //옷 분류를 해줘야함.
  //clothes.json에서 props.topData에 포함되어있는 Key를 찾아야함.




  // useEffect(() => {
  //   getAD();
  // }, [])
  import React, { useState, useEffect } from "react";
  import clothesData from '../json/clothes.json';
  import axios from "axios";

  function Advertising (props) {

    const [category, setCategory] = useState('');
    const [AD, setAD] = useState([]);


    useEffect(() => {
      const findCategory = () => {
        for (const categoryName in clothesData) {
          const foundItem = clothesData[categoryName].find(
            (item) => item.value === props.fashionName
          );
          if (foundItem) {
            setCategory(categoryName);
            break;
          }
        }
      };
  
      findCategory();
    }, [props.fashionName]);

  const getAD = async() => {
    const response = await axios.get(`http://localhost:4001/ad/data/${category}`)
    setAD(response.data);
  }

  useEffect(() => {
    getAD();
  }, [category]);



    return(
      <>
        {AD}
      </>
    );
  }

  export default Advertising;


