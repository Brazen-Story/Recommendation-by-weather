  //옷 분류를 해줘야함.
  //clothes.json에서 props.topData에 포함되어있는 Key를 찾아야함.

  // const [AD, setAD] = useState([]);

  // const getAD = async() => {
  //   const response = await axios.get(`http://localhost:4001/ad/data/${KeyData}`)
  //   setAD(response.data);
  // }

  // useEffect(() => {
  //   getAD();
  // }, [])

  function Advertising (props) {

    return(
      <>
        {props.data}
      </>
    );
  }

  export default Advertising;


