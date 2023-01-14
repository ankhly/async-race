import { Car, Obj, Garage } from '../type';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  car: '/garage/',
  engine: '/engine',
  winners: '/winners',
  winnersId: '/winners/:id',
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

// paginationPage(1, 4);

// updateCar(1, { name: 'fkf', color: 'green' });
// const getUpdateCar = async () => {
//  const newCar = await updateCar(1, {
//    name: 'moscv',
//    color: 'red',
//  });
//  console.log(newCar);
// };

// getUpdateCar();

// deleteCar();
// const getDeleteCar = async () => {
//  const newCar = await deleteCar(21);
//  console.log(newCar);
// };
// getDeleteCar();

// const generateParamsStr = (params:Obj[]) => (params.length
//  ? `?${params.map((e) => `${e.key}=${e.val}`).join('&')}` : '');

// const getItem = async (params:Obj[]) => {
//  const res = await fetch(`${baseUrl}${path.garage}${generateParamsStr(params)}`);
//  const data = await res.json();
//  console.log(data);
// };

// getItem([{ key: '12364565', val: 'bnv' }]);

// const getPages = async (params:Obj[]): Promise<{ items: Obj[];count:number; }> => {
//  const res = await fetch(`${baseUrl}${path.garage}${generateParamsStr(params)}`);
//  const items = await res.json();
//  const count = Number(res.headers.get('X-Total-Count'));
//  console.log(items);
//  return { items, count };
// };
/// / getPages();

// const paginationPage = async () => {
//  const info = await getPages([{ key: '_page', value: 0 }, { key: '_limit', value: 4 }]);
//  console.log(info);
// };

/// / paginationPage();

// const getCar = async () => {
//  const newCar = await createCar({
//    name: 'merssss',
//    color: 'red',
//  });
//  console.log(newCar);
// };

// getCar();

// const updateCarParam = async (id:number, body:Car) => {
//  const res = await fetch(`${baseUrl}${path.car}${id}`, {
//    method: 'PATCH',
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(body),
//  });
//  const car = await res.json();

//  return car;
// };

// const getUpdateCarParam = async () => {
//  const newCar = await updateCarParam(5, {
//    color: 'black',
//  });
//  console.log(newCar);
// };

/// / getUpdateCarParam();
/// / paginationPage();
/// / getItem([{ key: 'name', val: 'BMW' }]);

/// / getGarage();

// const deleteCar = async (id:number) => {
//  const res = await fetch(`${baseUrl}${path.car}${id}`, {
//    method: 'DELETE',
//  });
//  const car = await res.json();

//  return car;
// };

// const getDeleteCar = async () => {
//  const newCar = await deleteCar(55);
// };
// getDeleteCar();
