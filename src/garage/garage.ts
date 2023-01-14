import {
  getGarage, createCar, deleteCar, updateCar, paginationPage,
} from '../api/api';
import { renderCar, updateHTMLCar } from '../ui/uiGarage';
import {
  getRandomColor, getRandomName, haveCarsPage, showNumPage,
} from '../utils/utils';
import { savePageNum } from './store';

const carsPage = document.querySelector('.car-page') as HTMLElement;
const pagePrevBtn = document.querySelector('.page__prev') as HTMLButtonElement;
const pageNextBtn = document.querySelector('.page__next') as HTMLButtonElement;
const amountCars = document.querySelector('.page__title span') as HTMLElement;
const generateBtn = document.querySelector('.buttons__generate') as HTMLElement;
const createBtn = document.querySelector('.control-page__create') as HTMLButtonElement;
const updateBtn = document.querySelector('.control-page__update') as HTMLButtonElement;
const inputCar = document.querySelector('.control-page__input-car') as HTMLInputElement;
const inputColor = document.querySelector('.control-page__input-color') as HTMLInputElement;
const inputChangeName = document.querySelector('.control-page__input-change-car') as HTMLInputElement;
const inputChangeColor = document.querySelector('.control-page__input-change-color') as HTMLInputElement;
const numPage = Number(localStorage.getItem('countPage')) || 1;
let getIdCar = 0;
let countPage = numPage;
const limitCars = 7;
let isUpdate = false;
let TotalCountCars = 0;

const getAmountCars = () => {
  getGarage().then((arr) => {
    amountCars.innerHTML = String(arr.length);
    TotalCountCars = arr.length;
  });
};

const showGarage = (num:number, lim:number) => {
  paginationPage(num, lim).then((arr) => {
    arr.arr.forEach((e) => {
      if (e.name !== undefined && e.color !== undefined && e.id !== undefined) {
        renderCar(e.name, e.color, e.id);
      }
    });
    getAmountCars();
  });
  showNumPage(countPage);
};
showGarage(countPage, limitCars);

const createNewCar = (createName:string, createColor:string) => {
  createCar({ name: createName, color: createColor })
    .then((i) => {
      if (i.id !== undefined && haveCarsPage() < limitCars) {
        renderCar(i.name, i.color, i.id);
      }
    });
};

const removeOrSelectCar = (e:Event) => {
  getGarage().then((el) => {
    for (let i = 0; i < el.length; i++) {
      const carBody = document.querySelector(`[data-id = "${(el[i].id)}"]`) as HTMLElement;
      if (carBody) {
        const removeBtn = carBody.querySelector('.settings-car__remove') as HTMLElement;
        const selectBtn = carBody.querySelector('.settings-car__select') as HTMLElement;
        if (e.target === selectBtn) {
          isUpdate = true;
          inputChangeColor.value = el[i].color;
          inputChangeName.value = el[i].name;
          getIdCar = el[i].id;
        }
        if (e.target === removeBtn) {
          deleteCar(el[i].id);
          carBody.remove();
          getAmountCars();
          carsPage.innerHTML = '';
          showGarage(countPage, limitCars);
        }
      }
    }
  });
};

const showUpdateCar = () => {
  updateCar(getIdCar, {
    name: inputChangeName.value,
    color: inputChangeColor.value,
  }).then((e) => {
    const carBodys = document.querySelector(`[data-id = "${(e.id)}"]`) as HTMLElement;
    carBodys.innerHTML = updateHTMLCar(e.name, e.color, e.id);
  });
};

const pageNext = (totalPage:number) => {
  countPage = countPage === totalPage || haveCarsPage() === 0 ? countPage = 1 : countPage + 1;
  carsPage.innerHTML = '';
  showNumPage(countPage);
  showGarage(countPage, limitCars);
  savePageNum(countPage);
};

const pagePrev = (totalPage:number) => {
  countPage = countPage === 1 ? countPage = totalPage : countPage - 1;
  if (totalPage === 0) {
    countPage = 1;
  }
  carsPage.innerHTML = '';
  showNumPage(countPage);
  showGarage(countPage, limitCars);
  savePageNum(countPage);
};

document.addEventListener('click', (e:Event) => {
  const totalPage = Math.ceil(TotalCountCars / limitCars);
  removeOrSelectCar(e);
  if (e.target === createBtn) {
    if (inputCar.value !== '') {
      createNewCar(inputCar.value, inputColor.value);
      getAmountCars();
      inputCar.value = '';
    }
  }
  if (e.target === updateBtn && inputChangeName.value !== '' && isUpdate) {
    updateCar(getIdCar, { name: inputChangeName.value, color: inputChangeColor.value });
    showUpdateCar();
    inputChangeName.value = '';
    isUpdate = false;
  }
  if (e.target === generateBtn) {
    for (let i = 0; i < 10; i++) {
      createNewCar(getRandomName(), getRandomColor());
    }
    getAmountCars();
  }
  if (e.target === pageNextBtn) {
    pageNext(totalPage);
  }
  if (e.target === pagePrevBtn) {
    pagePrev(totalPage);
  }
});
