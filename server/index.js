const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
//const { response } = require('express');

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kim0523',
  database : 'byWeather',
  multipleStatements: true,
});
 
connection.connect();
 
var user = "SELECT * FROM USER;";
var report = "SELECT * FROM REPORT;"

connection.query(user + report, function (error, results, fields) {
  if (error) throw error;
  //console.log('The solution is: ', results);
});

app.post("/create", (req, res) => { //회원가입 로그인페이지
  const id = req.body.id;
  const phoneNumber = req.body.phoneNumber;
  const username = req.body.username;
  const password = req.body.password;

  const InsertUserSql =  "INSERT INTO user (id, pw, name, phone_number) VALUES (?,?,?,?);";
  const CreateUser = [id, password, username, phoneNumber];

  connection.query(InsertUserSql, CreateUser, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/login", (req, res) => { //로그인 로그인페이지

  const id = req.body.id;
  const LoginSql = "SELECT * FROM USER WHERE id = ?;"
  
  connection.query(LoginSql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({status: true, result});
    }
  }
  );
})

app.post("/submit", (req, res) => { //메인화면 상태 저장
  
  const { username, date, weather, selected, temperature, explanation, wind, rain} = req.body;

  const InsertUserSql =  "INSERT INTO report (name, date, state, fashion, temperature, Additional_explanation, wind, rain) VALUES (?,?,?,?,?,?,?,?);";

  const byWeather = [username, date, weather, selected, temperature, explanation, wind, rain];

  connection.query(InsertUserSql, byWeather, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({status: true});
      }
    }
  );
})

app.get("/data/:name", (req, res) => { //메인화면 데이터 추출

  const name = req.params.name;

  const sql = "SELECT * from report WHERE name = ?;"

  connection.query(sql, name, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.json(result)
    }
  })
});

app.delete("/deleteItem/:name/:temperature/:date", (req, res) => { //메인화면 데이터 삭제

  const name = req.params.name;
  const temperature = req.params.temperature;
  const date = req.params.date;
  const sql = `DELETE FROM report WHERE name = "${name}" AND temperature = "${temperature}" AND date="${date}";`

  connection.query(sql, (err, result) => {
    if(err){
      console.log(err)
    } else{
      //console.log(`Deleted ${result.affectedRows} row(s)`);
      res.send('Data deleted');
    }
  })
});

app.put('/update/:name/:temperature', (req, res) => { //메인화면 데이터 수정
  const name = req.params.name;
  const temperature = req.params.temperature;
  const newData = req.body;

  const query = `UPDATE report SET fashion = "${newData.selected}", Additional_explanation = "${newData.explanation}" WHERE name = "${name}" AND temperature = "${temperature}";`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating data');
    } else {
      res.status(200).send('Data updated successfully');
    }
  });
});

app.get("/manager", (req, res) => {

  const sql = "SELECT fashion, temperature from report;"

  connection.query(sql, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.json(result)
    }
  })
});


//connection.end();

app.listen(3001, () => {
  console.log("your server is running on port 3001");
});
