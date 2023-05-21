const db = require('../db/config');
const connection = db.connection;

exports.getData = (req, res) => {
    const category = req.params.category;

    const sql = 'select * from ad_information_tb where AD_ID = ?;'

    connection.query(sql, [category], async (err, result) => {
        if (err) {
            console.log(err);
          } else {
            res.json(result)
          }
    })
}

// exports.counting = (req, res) => {

//   //﻿mysql> ALTER TABLE 테이블 이름 AUTO_INCREMENT=변경할 숫자;

//   const Id = req.body.advertisingId;

//   const query = "INSERT INTO ad_click_tb (Ad_ID, click_Time, Click_Revenue) VALUES (?, CURRENT_TIMESTAMP(), (Ad_Click_Count)*0.01)";

//   connection.query(query, [Id], (error, results) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error inserting data into ad_click_tb" });
//     } else {
//       console.log("Data inserted into ad_click_tb");
//       res.status(200).json({ message: "Data inserted successfully" });
//     }
//   });
// }

exports.counting = (req, res) => {

  const advertisingId = req.body.advertisingId;

  // Find the maximum Ad_Click_Count value in ad_click_tb
  const maxCountQuery = "SELECT MAX(Ad_Click_Count) AS MaxCount FROM ad_click_tb";
  connection.query(maxCountQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving max Ad_Click_Count from ad_click_tb" });
    } else {
      let maxCount = 0;
      if (results.length > 0 && results[0].MaxCount) {
        maxCount = results[0].MaxCount;
      }
      const Revenue = (maxCount + 1)*0.01;


      const query = "INSERT INTO ad_click_tb (Ad_ID, click_Time, Click_Revenue) VALUES (?, CURRENT_TIMESTAMP(), ?)";
      connection.query(query, [advertisingId, Revenue], (insertError) => {
        if (insertError) {
          console.error(insertError);
          res.status(500).json({ message: "Error inserting data into ad_click_tb" });
        } else {
          console.log("Data inserted into ad_click_tb");
          res.status(200).json({ message: "Data inserted successfully" });
        }
      });
    }
  });
};

exports.exposed= (req, res) => {

  //﻿mysql> ALTER TABLE 테이블 이름 AUTO_INCREMENT=변경할 숫자;

  const advertisingId = req.body.advertisingId;

  // Find the maximum Ad_Click_Count value in ad_click_tb
  const maxCountQuery = "SELECT MAX(Impression_Count) AS MaxCount FROM ad_impression_tb";
  connection.query(maxCountQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving max Ad_Click_Count from ad_click_tb" });
    } else {
      let maxCount = 0;
      if (results.length > 0 && results[0].MaxCount) {
        maxCount = results[0].MaxCount;
      }
      const Revenue = (maxCount + 1)*0.01;


      const query = "INSERT INTO ad_impression_tb (Ad_ID, Impression_Time, Impression_Revenue) VALUES (?, CURRENT_TIMESTAMP(), ?)";
      connection.query(query, [advertisingId, Revenue], (insertError) => {
        if (insertError) {
          console.error(insertError);
          res.status(500).json({ message: "Error inserting data into ad_click_tb" });
        } else {
          console.log("Data inserted into ad_click_tb");
          res.status(200).json({ message: "Data inserted successfully" });
        }
      });
    }
  });

}