import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { format } from 'date-fns';

import { connection } from '../db/config';
import { MysqlError } from 'mysql';
import mysql from 'mysql';

const currentDate = format(new Date(), 'yyyyMMdd'); // 현재 날짜 (yyyyMMdd)

export const getWeather = async (req: Request, res: Response) => {

  const url = 'http://apis.data.go.kr/1360000/RadarImgInfoService/getCmpImg';
  const queryParams = new URLSearchParams();
  queryParams.append('serviceKey', 'LzjZqVyUzjE4coNcVdJSVesXSSL3q5Nqg3Kb+xtu/Wb8XtmZmFUPGKrXpGAUogbAi2r78eGpKUkG9fNfRxBYXg==');
  queryParams.append('pageNo', '1');
  queryParams.append('numOfRows', '10');
  queryParams.append('dataType', 'JSON');
  queryParams.append('data', 'CMP_WRC');
  queryParams.append('time', currentDate);

  axios.get(url, { params: queryParams })
    .then((response: AxiosResponse<any>) => {
      if (response && response.status) {
        //   console.log('Status', response.status);
        //   console.log('Headers', response.headers);
        // console.log('Response received', response.data.response.body.items.item[0]);
        res.json(response.data.response.body.items.item[0])
      } else {
        console.error('Error: Invalid response');
      }
    })
    .catch(error => {
      console.error('Error', error);
    });
}

export const getWthrBrkNews = async (req: Request, res: Response) => {
  const url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnList';
  const queryParams = new URLSearchParams();
  queryParams.append('serviceKey', 'LzjZqVyUzjE4coNcVdJSVesXSSL3q5Nqg3Kb+xtu/Wb8XtmZmFUPGKrXpGAUogbAi2r78eGpKUkG9fNfRxBYXg==');
  queryParams.append('pageNo', '1');
  queryParams.append('numOfRows', '10');
  queryParams.append('dataType', 'JSON');
  queryParams.append('stnId', '108');
  queryParams.append('fromTmFc', currentDate);
  queryParams.append('toTmFc', currentDate);

  axios.get(url, { params: queryParams })
  .then((response: AxiosResponse<any>) => {
    if (response && response.status) {
      if (response.data.response.body && response.data.response.body.items && response.data.response.body.items.item) {
        res.json(response.data.response.body.items.item);
      } else {
        console.error('Error: Invalid response structure');
        res.status(500).json({ error: 'Invalid response structure' }); //여기서 데이터가 없다면? status: false를 보냄. 그리고 클라이언트에서는 false를 받고 특보가 없다는 것을 명시해줌
      }
    } else {
      console.error('Error: Invalid response');
      res.status(500).json({ error: 'Invalid response' });
    }
  })
  .catch(error => {
    console.error('Error', error);
    res.status(500).json({ error: 'An error occurred' });
  });

}

export const getFindDust =async (req:Request, res: Response) => {

  const date = format(new Date(), 'yyyy-MM-dd'); // 현재 날짜 (YYYY-MM-DD)

  const url = 'http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo';
  const queryParams = new URLSearchParams();
  queryParams.append('serviceKey', 'LzjZqVyUzjE4coNcVdJSVesXSSL3q5Nqg3Kb+xtu/Wb8XtmZmFUPGKrXpGAUogbAi2r78eGpKUkG9fNfRxBYXg==');
  queryParams.append('returnType', 'json');
  queryParams.append('numOfRows', '100');
  queryParams.append('pageNo', '1');
  queryParams.append('year', '2023');

  axios.get(url, { params: queryParams })
  .then((response: AxiosResponse<any>) => {
    const filteredData = response.data.response.body.items.filter(item => item.issueDate === date);
    res.json(filteredData)
  })
  .catch(error => {
    console.error('Error', error);
    res.status(500).json({ error: 'An error occurred' });
  });

}

export const getDayLightCycle = async (req:Request, res: Response) => {

  const name = req.body.place;

  console.log(name)

  const date = format(new Date(), 'yyyyMMdd'); // 현재 날짜 (YYYY-MM-DD)

  console.log(date)

  const url = 'http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo';
  const queryParams = new URLSearchParams();
  queryParams.append('serviceKey', 'LzjZqVyUzjE4coNcVdJSVesXSSL3q5Nqg3Kb+xtu/Wb8XtmZmFUPGKrXpGAUogbAi2r78eGpKUkG9fNfRxBYXg==');
  queryParams.append('locdate', date);
  queryParams.append('location', name);

  axios.get(url, { params: queryParams })
  .then((response: AxiosResponse<any>) => {
    console.log(response.data.response.body.items.item)
    res.json(response.data.response.body.items.item)
  })
  .catch(error => {
    console.error('Error', error);
    res.status(500).json({ error: 'An error occurred' });
  });

}