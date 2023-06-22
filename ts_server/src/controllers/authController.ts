import { Request, Response } from 'express';
import { connection } from '../db/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MysqlError } from 'mysql';

const saltRounds = 10; // salt의 자릿수

interface User {
  id: string;
  pw: string;
  name: string;
  phone_number: string;
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.body.id;
  const phoneNumber = req.body.phoneNumber;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } else {
      const InsertUserSql = "INSERT INTO user (id, pw, name, phone_number) VALUES (?,?,?,?);";
      const CreateUser = [id, hashedPassword, username, phoneNumber];

      connection.query(InsertUserSql, CreateUser, (err: MysqlError | null) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      });
    }
  });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body;
    const loginSql = 'SELECT * FROM `USER` WHERE id = ?';

    connection.query(loginSql, [id], async (err: MysqlError | null, result: User[]) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: false, message: '로그인에 실패했습니다.' });
        return;
      }

      if (result.length === 0) {
        res.status(403).json({ status: false, message: '아이디를 찾을 수 없습니다.' });
        return;
      }

      const user = result[0] as User;
      const match = await bcrypt.compare(password, user.pw);

      if (!match) {
        res.status(403).json({ status: false, message: '비밀번호가 일치하지 않습니다.' });
        return;
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.name,
          phoneNumber: user.phone_number,
        },
        process.env.ACCESS_SECRET || 'default-access-secret',
        {
          expiresIn: '60m',
          issuer: 'About Tech',
        }
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
          username: user.name,
          phoneNumber: user.phone_number,
        },
        process.env.REFRESH_SECRET || 'default-refresh-secret',
        {
          expiresIn: '24h',
          issuer: 'About Tech',
        }
      );

      res.cookie('accessToken', accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });

      const { name, ...others } = user;
      console.log(name);

      res.json({ status: true, name });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: '서버 오류입니다.' });
  }
};


export const loginSuccess = (req: Request, res: Response): void => {
  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET!) as { id: string };

  const query = "select name from USER where id = ?";

  connection.query(query, [data.id], (err: MysqlError | null, results: String) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: true, results });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ManagerUserList = async (req: Request, res: Response): Promise<void> => {
  const sql = `SELECT u.id, u.name, DATE_FORMAT(u.join_date, '%Y-%m-%d') as join_date, IFNULL(COUNT(r.name), 0) as count 
    FROM user u LEFT JOIN report r ON u.name = r.name
    GROUP BY u.id, u.name, join_date
    ORDER BY count DESC;`;

  connection.query(sql, (err: Error, result: User[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

export const loginKeep = (req: Request, res: Response): void => {
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET!) as User;

    const query = "select * from USER where id = ?";

    connection.query(query, [data.id], (err: MysqlError | null) => {
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
            process.env.ACCESS_SECRET!,
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
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
