const User = require('../model/userModel');
const db = require('../db/config');
const connection = db.connection;
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 자릿수


exports.createUser = async (req, res) => { //회원가입 로그인페이지
    const id = req.body.id;
    const phoneNumber = req.body.phoneNumber;
    const username = req.body.username;
    const password = req.body.password;

  // bcrypt.hash 함수를 사용해서 비밀번호를 해싱합니다.
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } else {
      const InsertUserSql = "INSERT INTO user (id, pw, name, phone_number) VALUES (?,?,?,?);";
      const CreateUser = [id, hashedPassword, username, phoneNumber];

      connection.query(InsertUserSql, CreateUser, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      });
    }
  });
}


exports.loginUser = async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const LoginSql = "SELECT * FROM USER WHERE id = ?;";
  
    connection.query(LoginSql, [id], async (err, result) => {
      if (err) {
        console.log(err);
        res.json({ status: false, message: "로그인에 실패했습니다." });
      } else {
        if (result.length > 0) {
          const user = result[0];
          const match = await bcrypt.compare(password, user.pw);
          if (match) {
            res.json({ status: true, result });
          } else {
            res.json({ status: false, message: "아이디 또는 비밀번호가 일치하지 않습니다." });
          }
        } else {
          res.json({ status: false, message: "아이디 또는 비밀번호가 일치하지 않습니다." });
        }
      }
    });
  };
//   exports.loginUser = async(req, res) => {
//     const id = req.body.id;
//     const password = req.body.password;
//     const LoginSql = "SELECT * FROM USER WHERE id = ? AND pw = ?;"
  
//     connection.query(LoginSql, [id, password], (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         if (result.length > 0) {
//           res.json({ status: true, result });
//         } else {
//           res.json({ status: false, message: "아이디 또는 비밀번호가 일치하지 않습니다." });
//         }
//       }
//     }
//     );
//   }