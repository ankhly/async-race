import { baseUrl, path } from './apiGarage';
import { CarWin, UpdateWin } from '../utils/type';

export const getWinners = async ():Promise<Array<CarWin>> => (await fetch(`${baseUrl}${path.winners}`)).json();

export const getWinner = async (id:number):Promise<CarWin> => (await fetch(`${baseUrl}${path.winners}/${id}`)).json();

export const deleteWinner = async (id:number):Promise<Response> => fetch(`${baseUrl}${path.winners}/${id}`,
  { method: 'DELETE' });

export const getSortWinners = async (sort:string, order:string):Promise<Array<CarWin>> => {
  const res = await fetch(`${baseUrl}${path.winners}?&_sort=${sort}&_order=${order}`);
  return res.json();
};

export const createWinner = async (body:CarWin):Promise<CarWin> => {
  const res = await fetch(`${baseUrl}${path.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const updateWinner = async (id:number, body:UpdateWin):Promise<UpdateWin> => {
  const res = await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};
