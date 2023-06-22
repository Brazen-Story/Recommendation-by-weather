import { Request, Response } from 'express';
import { connection } from '../db/config';
import { MysqlError } from 'mysql';

interface Report {
  name: string;
  date: string;
  state: string;
  fashion: string;
  temperature: number;
  Additional_explanation: string;
  rain: string;
  wind: string;
}

export const submitReport = async (req: Request, res: Response) => {
  const { username, date, weather, selected, temperature, explanation, wind, rain } = req.body;

  const InsertUserSql = "INSERT INTO report (name, date, state, fashion, temperature, Additional_explanation, wind, rain) VALUES (?,?,?,?,?,?,?,?);";
  const byWeather = [username, date, weather, selected, temperature, explanation, wind, rain];

  connection.query(InsertUserSql, byWeather, (err: MysqlError | null) => {
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
  });
};

export const getReportsByName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const sql = "SELECT * from report WHERE name = ?;";

  connection.query(sql, name, (err: MysqlError | null, result: String) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

export const deleteReport = async (req: Request, res: Response) => {
  const name = req.params.name;
  const temperature = req.params.temperature;
  const date = req.params.date;
  const sql = `DELETE FROM report WHERE name = "${name}" AND temperature = "${temperature}" AND date="${date}";`;

  connection.query(sql, (err: MysqlError | null) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Data deleted');
    }
  });
};

export const updateReport = async (req: Request, res: Response) => {
  const name = req.params.name;
  const temperature = req.params.temperature;
  const wind = req.params.wind;
  const newData = req.body;
  const fashionValue = newData.selected.join(',');
  const query = `UPDATE report SET fashion = ?, Additional_explanation = ? WHERE name = ? AND temperature = ? AND wind = ?;`;

  connection.query(query, [fashionValue, newData.explanation, name, temperature, wind], (error: MysqlError | null) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating data');
    } else {
      res.send({ status: true });
    }
  });
};

export const managerPage = async (req: Request, res: Response) => {
  const sql = "SELECT temperature, GROUP_CONCAT(fashion SEPARATOR ',') as fashion_list FROM report GROUP BY temperature ORDER BY temperature;";

  connection.query(sql, (err: MysqlError | null, result: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const output = result.map((r: any) => {
        const fashionMap = new Map();
        const fashionList = r.fashion_list.split(',');
        for (const f of fashionList) {
          const count = fashionMap.get(f) || 0;
          fashionMap.set(f, count + 1);
        }

        const sortedFashionCounts = Array.from(fashionMap.entries()).sort((a, b) => b[1] - a[1]);

        return {
          temperature: r.temperature,
          fashion_list: sortedFashionCounts.map(([fashion, count]) => ({ fashion, count })),
        };
      });
      res.json(output);
    }
  });
};

export const findtemp = async (req: Request, res: Response) => {
  const info = [req.params.name, req.params.findTemp];
  const sql = "SELECT * from report WHERE name = ? AND temperature = ?;";

  connection.query(sql, info, (err: MysqlError | null, result: Report[]) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
};
