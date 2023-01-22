import {
  Car, Obj, Garage, MoveCar,
} from '../utils/type';

export const baseUrl = 'http://127.0.0.1:3000';

export const path = {
  garage: '/garage',
  car: '/garage/',
  engine: '/engine',
  winners: '/winners',
};

export const getGarage = async ():Promise<Array<Garage>> => (await fetch(`${baseUrl}${path.garage}`)).json();

export const getCar = async (id:number):Promise<Garage> => (await fetch(`${baseUrl}${path.car}${id}`)).json();

export const deleteCar = async (id:number):Promise<Response> => fetch(`${baseUrl}${path.car}${id}`,
  { method: 'DELETE' });

export const createCar = async (body:Car):Promise<Car> => {
  const res = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const updateCar = async (id:number, body:Car):Promise<Garage> => {
  const res = await fetch(`${baseUrl}${path.car}${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

const generateParamsStr = (params:Obj[]) => (params.length
  ? `?${params.map((e) => `${e.key}=${e.value}`).join('&')}` : '');

const getPages = async (params:Obj[]): Promise<{ arr: Obj[], count:number; }> => {
  const res = await fetch(`${baseUrl}${path.garage}${generateParamsStr(params)}`);
  const arr = await res.json();
  const count = Number(res.headers.get('X-Total-Count'));
  return { arr, count };
};

export const paginationPage = async (page:number, limit:number): Promise<{ arr:Obj[], count:number; }> => {
  const items = await getPages([{ key: '_page', value: page }, { key: '_limit', value: limit }]);
  return items;
};

export const startEngine = async (id:number):Promise<MoveCar> => {
  const res = await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  return res.json();
};

export const stopEngine = async (id:number):Promise<MoveCar> => {
  const res = await fetch(`${baseUrl}${path.engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  return res.json();
};

export const drive = async (id:number):Promise<boolean> => {
  const res = await fetch(`${baseUrl}${path.engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  return res.status === 200;
};
