import { toWinner, toGarage, renderGaragePage } from '../ui/uiGarage';
import { renderWinnersPage } from '../ui/uiWinners';
import { showWinnersCars } from '../winners/winners';
import { getSortWinners } from '../api/apiWinners';
import { showGarage, htmlEle } from '../garage/garage';

const historyResolver = (location:string) => {
  window.history.pushState({}, '', location);
  localStorage.setItem('location', location);
};

historyResolver(localStorage.getItem('location') || '#garage');

export const getContentPage = ():void => {
  if (window.location.hash === '#winners') {
    renderWinnersPage();
    showWinnersCars(getSortWinners('wins', 'DESC'));
  }
  if (window.location.hash === '#garage') {
    renderGaragePage();
    htmlEle.carsPage = document.querySelector('.car-page') as HTMLElement;
    htmlEle.pagePrevBtn = document.querySelector('.page__prev') as HTMLButtonElement;
    htmlEle.pageNextBtn = document.querySelector('.page__next') as HTMLButtonElement;
    htmlEle.amountCars = document.querySelector('.page__title span') as HTMLElement;
    htmlEle.generateBtn = document.querySelector('.buttons__generate') as HTMLElement;
    htmlEle.createBtn = document.querySelector('.control-page__create') as HTMLButtonElement;
    htmlEle.updateBtn = document.querySelector('.control-page__update') as HTMLButtonElement;
    htmlEle.inputCar = document.querySelector('.control-page__input-car') as HTMLInputElement;
    htmlEle.inputColor = document.querySelector('.control-page__input-color') as HTMLInputElement;
    htmlEle.inputChangeName = document.querySelector('.control-page__input-change-car') as HTMLInputElement;
    htmlEle.inputChangeColor = document.querySelector('.control-page__input-change-color') as HTMLInputElement;
    htmlEle.popup = document.querySelector('.popup') as HTMLElement;
    htmlEle.recetBtn = document.querySelector('.buttons__reset') as HTMLButtonElement;
    htmlEle.limitCars = 7;
    htmlEle.raceBtn = document.querySelector('.buttons__race') as HTMLButtonElement;
    showGarage(Number(localStorage.getItem('countPage')), htmlEle.limitCars);
  }
};

getContentPage();

const toWinnerPage = () => {
  historyResolver('#winners');
  getContentPage();
};

const toGaragePage = () => {
  historyResolver('#garage');
  getContentPage();
};

toWinner.addEventListener('click', toWinnerPage);
toGarage.addEventListener('click', toGaragePage);
