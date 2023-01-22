import {
  getGarage, createCar, deleteCar, updateCar, paginationPage,
} from '../api/apiGarage';
import { renderCar, updateHTMLCar } from '../ui/uiGarage';
import {
  getRandomColor, getRandomName, haveCarsPage, showNumPage,
  savePageNum,
} from '../utils/utils';
import { controlCar, controlRace } from './animation';
import { delCarWin, sortWinners } from '../winners/winners';

export const htmlEle = {
  carsPage: document.querySelector('.car-page') as HTMLElement,
  pagePrevBtn: document.querySelector('.page__prev') as HTMLButtonElement,
  pageNextBtn: document.querySelector('.page__next') as HTMLButtonElement,
  amountCars: document.querySelector('.page__title span') as HTMLElement,
  generateBtn: document.querySelector('.buttons__generate') as HTMLElement,
  createBtn: document.querySelector('.control-page__create') as HTMLButtonElement,
  updateBtn: document.querySelector('.control-page__update') as HTMLButtonElement,
  inputCar: document.querySelector('.control-page__input-car') as HTMLInputElement,
  inputColor: document.querySelector('.control-page__input-color') as HTMLInputElement,
  inputChangeName: document.querySelector('.control-page__input-change-car') as HTMLInputElement,
  inputChangeColor: document.querySelector('.control-page__input-change-color') as HTMLInputElement,
  popup: document.querySelector('.popup') as HTMLElement,
  recetBtn: document.querySelector('.buttons__reset') as HTMLButtonElement,
  limitCars: 7,
  raceBtn: document.querySelector('.buttons__race') as HTMLButtonElement,
};

export const numPage = Number(localStorage.getItem('countPage') || 1);
let countPage = numPage;
let getIdCar = 0;
let isUpdate = false;
let TotalCountCars = 0;

const getAmountCars = ():void => {
  getGarage().then((arr) => {
    htmlEle.amountCars.innerHTML = String(arr.length);
    TotalCountCars = arr.length;
  });
};

export const showGarage = (num:number, lim:number):void => {
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

const createNewCar = (createName:string, createColor:string) => {
  createCar({ name: createName, color: createColor })
    .then((i) => {
      if (i.id !== undefined && haveCarsPage() < htmlEle.limitCars) {
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
          htmlEle.inputChangeColor.value = el[i].color;
          htmlEle.inputChangeName.value = el[i].name;
          getIdCar = el[i].id;
        }
        if (e.target === removeBtn) {
          deleteCar(el[i].id);
          carBody.remove();
          getAmountCars();
          htmlEle.carsPage.innerHTML = '';
          showGarage(countPage, htmlEle.limitCars);
          delCarWin(el[i].id);
        }
      }
    }
  });
};

const showUpdateCar = () => {
  updateCar(getIdCar, {
    name: htmlEle.inputChangeName.value,
    color: htmlEle.inputChangeColor.value,
  }).then((e) => {
    const carBodys = document.querySelector(`[data-id = "${(e.id)}"]`) as HTMLElement;
    carBodys.innerHTML = updateHTMLCar(e.name, e.color, e.id);
  });
};

const pageNext = (totalPage:number) => {
  countPage = countPage === totalPage || haveCarsPage() === 0 ? countPage = 1 : countPage + 1;
  htmlEle.carsPage.innerHTML = '';
  showNumPage(countPage);
  showGarage(countPage, htmlEle.limitCars);
  savePageNum(countPage);
};

const pagePrev = (totalPage:number) => {
  countPage = countPage === 1 ? countPage = totalPage : countPage - 1;
  if (totalPage === 0) {
    countPage = 1;
  }
  htmlEle.carsPage.innerHTML = '';
  showNumPage(countPage);
  showGarage(countPage, htmlEle.limitCars);
  savePageNum(countPage);
};

function listenClick(e:Event):void {
  controlCar(e);
  sortWinners(e);
  const totalPage = Math.ceil(TotalCountCars / htmlEle.limitCars);
  removeOrSelectCar(e);
  if (e.target === htmlEle.createBtn) {
    if (htmlEle.inputCar.value !== '') {
      createNewCar(htmlEle.inputCar.value, htmlEle.inputColor.value);
      getAmountCars();
      htmlEle.inputCar.value = '';
    }
  }
  if (e.target === htmlEle.updateBtn && htmlEle.inputChangeName.value !== '' && isUpdate) {
    updateCar(getIdCar, { name: htmlEle.inputChangeName.value, color: htmlEle.inputChangeColor.value });
    showUpdateCar();
    htmlEle.inputChangeName.value = '';
    isUpdate = false;
  }
  if (e.target === htmlEle.generateBtn) {
    for (let i = 0; i < 100; i++) {
      createNewCar(getRandomName(), getRandomColor());
    }
    getAmountCars();
  }
  if (e.target === htmlEle.pageNextBtn) {
    pageNext(totalPage);
  }
  if (e.target === htmlEle.pagePrevBtn) {
    pagePrev(totalPage);
  }
  if (e.target === htmlEle.raceBtn || e.target === htmlEle.recetBtn) {
    controlRace(e, htmlEle.raceBtn, htmlEle.recetBtn);
  }
  if (e.target === htmlEle.popup) {
    htmlEle.popup.innerHTML = '';
    htmlEle.popup.style.display = 'none';
  }
}

document.addEventListener('click', listenClick);
