const Report = require('../model/reportModel');
const db = require('../db/config');
const connection = db.connection;


exports.submitReport = async(req, res) => { //메인화면 상태 저장

    const { username, date, weather, selected, temperature, explanation, wind, rain } = req.body;
  
    const InsertUserSql = "INSERT INTO report (name, date, state, fashion, temperature, Additional_explanation, wind, rain) VALUES (?,?,?,?,?,?,?,?);";
  
    const byWeather = [username, date, weather, selected, temperature, explanation, wind, rain];
  
    connection.query(InsertUserSql, byWeather, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ status: true });
      }
    }
    );
  }
  
 exports.getReportsByName = async(req, res) => { //메인화면 데이터 추출
  
    const name = req.params.name;
  
    const sql = "SELECT * from report WHERE name = ?;"
  
    connection.query(sql, name, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result)
      }
    })
  }
  
 exports.deleteReport = async(req, res) => { //메인화면 데이터 삭제
  
    const name = req.params.name;
    const temperature = req.params.temperature;
    const date = req.params.date;
    const sql = `DELETE FROM report WHERE name = "${name}" AND temperature = "${temperature}" AND date="${date}";`
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        //console.log(`Deleted ${result.affectedRows} row(s)`);
        res.send('Data deleted');
      }
    })
  }
  
 exports.updateReport = async(req, res) => { //메인화면 데이터 수정
  
    const name = req.params.name;
    const temperature = req.params.temperature;
    const wind = req.params.wind;
  
    const newData = req.body;
  
    const fashionValue = newData.selected.join(',');
  
    const query =  `UPDATE report SET fashion = ?, Additional_explanation = ?
     WHERE name = ? AND temperature = ? AND wind = ?;`;
  
    connection.query(query, [fashionValue, newData.explanation, name, temperature, wind], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating data');
      } else {
        res.send({ status: true });
      }
    });
  }
  
exports.managerPage = async(req, res) => {
  
    const sql = "SELECT fashion, temperature from report;"
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result)
      }
    })
  }
  
exports.findtemp = async(req, res) => {
  
    const info = [req.params.name, req.params.findTemp];
  
    const sql = "SELECT * from report WHERE name = ? AND temperature = ?;"
  
    connection.query(sql, info, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result)
      }
    })
  }
  