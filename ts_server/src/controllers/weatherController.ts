import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

const currentDate = getCurrentDate();

export const weather = async (req: Request, res: Response) => {

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
        //   console.log('Status', response.status);
        //   console.log('Headers', response.headers);
        // console.log('Response received', response.data.response.body.items.item[0]);
                // console.log(response.data.response.body.items.item)
        res.json(response.data.response.body.items.item)

      } else {
        console.error('Error: Invalid response');
      }
    })
    .catch(error => {
      console.error('Error', error);
    });
}