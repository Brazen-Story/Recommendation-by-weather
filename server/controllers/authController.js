const User = require('../model/userModel');
const db = require('../db/config');
const connection = db.connection;
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 자릿수
const jwt = require("jsonwebtoken");

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

exports.loginUser = async (req, res) => { //토큰이 지급이 안됌
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
        if (!match) {
          res.status(403).json("Not Authorized");
        } else {
          try {
            // access Token 발급
            const accessToken = jwt.sign({
              id: user.id,
              username: user.name,
              phoneNumber: user.phone_number,
            }, process.env.ACCESS_SECRET, {
              expiresIn: '60m',
              issuer: 'About Tech',
            });

            // refresh Token 발급
            const refreshToken = jwt.sign({
              id: user.id,
              username: user.name,
              phoneNumber: user.phone_number,
            }, process.env.REFRECH_SECRET, {
              expiresIn: '24h',
              issuer: 'About Tech',
            })

            // token 전송
            res.cookie("accessToken", accessToken, {
              secure: false,
              httpOnly: true,
            })

            res.cookie("refreshToken", refreshToken, {
              secure: false,
              httpOnly: true,
            })

            const { name, ...others} = user;
            console.log(name)

            res.json({ status: true, name });

          } catch (error) {
            res.status(500).json(error);
          }
        }
      };
    }
  });
};

exports.loginSuccess = (req, res) => {

  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET);

  const query = "select name from USER where id = ?";

  connection.query(query, [data.id], (err, results) => { // change error to err
    try {
      if (err) {
        console.log(err);
      } else {
        console.log(results)
        res.json({ status: true, results });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  })
};

exports.logoutUser = async (req, res) => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.ManagerUserList = async (req, res) => {

  const sql = `SELECT u.id, u.name, DATE_FORMAT(u.join_date, '%Y-%m-%d') as join_date, IFNULL(COUNT(r.name), 0) as count 
    FROM user u LEFT JOIN report r ON u.name = r.name
    GROUP BY u.id, u.name, join_date
    ORDER BY count DESC;`

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.json(result)
    }
  })
};

exports.loginKeep = (req, res) => {
    try{
      const token = req.cookies.refreshToken;
      const data = jwt.verify(token, process.env.REFRECH_SECRET);
  
      const query = "select * from USER where id = ?";
  
      connection.query(query, [data.id], (err, results) => {
        try {
          if (err) {
            console.log(err);
          } else {
            // access Token 새로 발급
            const accessToken = jwt.sign(
              {
                id: data.id,
                username: data.name,
                phoneNumber: data.phone_number,
              },
              process.env.ACCESS_SECRET,
              {
                expiresIn: '60m',
                issuer: 'About Tech',
              }
            );
            res.cookie('accessToken', accessToken, {
              secure: false,
              httpOnly: true,
            }).json({});
          }
        } catch (error) {
          res.status(500).json(error);
        }
      })
    }catch (error) {
      res.status(500).json(error);
    }
};