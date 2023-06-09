import { Request, Response } from 'express';
import { connection } from '../db/config';
import { MysqlError } from 'mysql';

interface information{
    Ad_ID: string;
    Ad_Name: string;
    Ad_Image_Url: string;
    Ad_link: string;
}

export const getData = (req: Request, res: Response): void => {
  const category = req.params.category;

  const query = 'SELECT * FROM ad_information_tb WHERE AD_ID = ?;';

  connection.query(query, [category], (err: MysqlError | null, result: information) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

export const counting = (req: Request, res: Response): void => {
  
  const advertisingId = req.body.advertisingId;

  console.log(advertisingId)

  const query = 'SELECT MAX(Ad_Click_Count) AS MaxCount FROM ad_click_tb';
  connection.query(query, (error: MysqlError | null, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving max Ad_Click_Count from ad_click_tb' });
    } else {
      let maxCount = 0;
      if (results.length > 0 && results[0].MaxCount) {
        maxCount = results[0].MaxCount;
      }
      const Revenue = (maxCount + 1) * 0.01;

      const query = 'INSERT INTO ad_click_tb (Ad_ID, click_Time, Click_Revenue) VALUES (?, CURRENT_TIMESTAMP(), ?)';
      connection.query(query, [advertisingId, Revenue], (insertError: Error) => {
        if (insertError) {
          console.error(insertError);
          res.status(500).json({ message: 'Error inserting data into ad_click_tb' });
        } else {
          console.log('Data inserted into ad_click_tb');
          res.status(200).json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
};

export const exposed = (req: Request, res: Response): void => {
  const advertisingId = req.body.advertisingId;

  const query = 'SELECT MAX(Impression_Count) AS MaxCount FROM ad_impression_tb';
  connection.query(query, (error: MysqlError | null, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving max Ad_Click_Count from ad_click_tb' });
    } else {
      let maxCount = 0;
      if (results.length > 0 && results[0].MaxCount) {
        maxCount = results[0].MaxCount;
      }
      const Revenue = (maxCount + 1) * 0.01;

      const query = 'INSERT INTO ad_impression_tb (Ad_ID, Impression_Time, Impression_Revenue) VALUES (?, CURRENT_TIMESTAMP(), ?)';
      connection.query(query, [advertisingId, Revenue], (insertError : Error) => {
        if (insertError) {
          console.error(insertError);
          res.status(500).json({ message: 'Error inserting data into ad_click_tb' });
        } else {
          console.log('Data inserted into ad_click_tb');
          res.status(200).json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
};

export const advertisingList = (req: Request, res: Response): void => {
  const query = `
    SELECT
      ac.Ad_ID,
      ac.Ad_Click_Count,
      ac.Click_Revenue,
      ai.Impression_Time,
      ai.Impression_Count,
      ai.Impression_Revenue,
      COALESCE(ac.Click_Time, '0000-00-00 00:00:00') AS Click_Time
    FROM
      ad_click_tb ac
    LEFT JOIN
    ad_impression_tb ai ON ac.Ad_ID = ai.Ad_ID
  UNION
  SELECT
    ai.Ad_ID,
    ac.Ad_Click_Count,
    ac.Click_Revenue,
    ai.Impression_Time,
    ai.Impression_Count,
    ai.Impression_Revenue,
    ac.Click_Time
  FROM
    ad_click_tb ac
  RIGHT JOIN
    ad_impression_tb ai ON ac.Ad_ID = ai.Ad_ID
  WHERE
    ac.Ad_ID IS NULL
  ORDER BY
    Impression_Time DESC,
    Click_Time DESC;
`;

connection.query(query, (error: MysqlError | null, results: any) => {
  if (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  } else {
    res.status(200).json(results);
    console.log(results);
  }
});
};
