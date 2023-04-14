const Report = require('../model/reportModel');
const db = require('../db/config');
const connection = db.connection;


exports.submitReport = async (req, res) => { //메인화면 상태 저장

  const { username, date, weather, selected, temperature, explanation, wind, rain } = req.body;

  const InsertUserSql = "INSERT INTO report (name, date, state, fashion, temperature, Additional_explanation, wind, rain) VALUES (?,?,?,?,?,?,?,?);";

  const byWeather = [username, date, weather, selected, temperature, explanation, wind, rain];

  connection.query(InsertUserSql, byWeather, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send('중복된 데이터가 이미 존재합니다.');
      } else {
        console.error(err);
        res.status(500).send('서버 오류가 발생했습니다.');
      }
    } else {
      res.send({ status: true });
    }
  }
  );
}

exports.getReportsByName = async (req, res) => { //메인화면 데이터 추출

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

exports.deleteReport = async (req, res) => { //메인화면 데이터 삭제

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

exports.updateReport = async (req, res) => { //메인화면 데이터 수정

  const name = req.params.name;
  const temperature = req.params.temperature;
  const wind = req.params.wind;

  const newData = req.body;

  const fashionValue = newData.selected.join(',');

  const query = `UPDATE report SET fashion = ?, Additional_explanation = ?
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

exports.managerPage = async (req, res) => {
  const sql = "SELECT temperature, GROUP_CONCAT(fashion SEPARATOR ',') as fashion_list FROM report GROUP BY temperature ORDER BY temperature;"

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const output = result.map((r) => {
        const fashionMap = new Map();
        const fashionList = r.fashion_list.split(",");
        for (const f of fashionList) {
          const count = fashionMap.get(f) || 0;
          fashionMap.set(f, count + 1);
        }
      
        // 맵 객체를 배열로 변환한 다음, 정렬 함수를 이용하여 정렬
        const sortedFashionCounts = Array.from(fashionMap.entries()).sort((a, b) => b[1] - a[1]);
      
        // 정렬된 배열을 이용하여 출력 객체 생성
        return {
          temperature: r.temperature,
          fashion_list: sortedFashionCounts.map(([fashion, count]) => ({ fashion, count })),
        };
      });
      
      res.json(output);
    }
  });
};

exports.findtemp = async (req, res) => {

  const info = [req.params.name, req.params.findTemp];

  const sql = "SELECT * from report WHERE name = ? AND temperature = ?;"

  connection.query(sql, info, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.json(result)
    }
  })
};

