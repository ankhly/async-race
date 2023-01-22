import {
  createWinner, getWinners, deleteWinner, updateWinner, getWinner, getSortWinners,
} from '../api/apiWinners';
import { CarWin } from '../utils/type';
import { getCar } from '../api/apiGarage';
import { renderWin } from '../ui/uiGarage';
import { renderWinnersCar } from '../ui/uiWinners';

const sortBy = {
  winsTop: getSortWinners('wins', 'DESC'),
  timeTop: getSortWinners('time', 'ASC'),
  winsBottom: getSortWinners('wins', 'ASC'),
  timeBottom: getSortWinners('time', 'DESC'),
};

const createUpdateWinner = (objWin:CarWin) => {
  getWinners().then((arr) => {
    const arrIdWin:Array<number> = [];
    arr.forEach((e:CarWin) => {
      arrIdWin.push(e.id);
    });
    if (arrIdWin.includes(objWin.id)) {
      getWinner(objWin.id).then((el) => {
        el.wins++;
        if (objWin.time < el.time) {
          el.time = objWin.time;
        }
        updateWinner(objWin.id, { wins: el.wins, time: el.time });
      });
    } else {
      createWinner(objWin);
    }
  });
};

export const getWinnerRace = (idWinner:number, timeStart:number):CarWin => {
  const timeWinner = Number(((new Date().getTime() - timeStart) * 0.001).toFixed(2));
  const countWins = 1;
  const itemWinner = {
    id: idWinner,
    wins: countWins,
    time: timeWinner,
  };
  getCar(itemWinner.id).then((el) => {
    renderWin(el.name, itemWinner.time);
  });
  createUpdateWinner(itemWinner);
  return itemWinner;
};

export const delCarWin = (id:number):void => {
  getWinners().then((arr) => {
    arr.forEach((elWin) => {
      if (elWin.id === id) {
        deleteWinner(id);
      }
    });
  });
};

export const showWinnersCars = (fun: Promise<CarWin[]>):void => {
  fun.then((arr) => {
    const winTitle = document.querySelector('.winners-page__title span') as HTMLInputElement;
    const winnersBody = document.querySelector('.table-winners__body') as HTMLElement;
    winTitle.innerHTML = String(arr.length);
    winnersBody.innerHTML = '';
    arr.forEach((e:CarWin, i) => {
      getCar(e.id).then((el) => {
        renderWinnersCar(el.color, el.name, e.wins, e.time, i + 1);
      });
    });
    sortBy.winsTop = getSortWinners('wins', 'DESC');
    sortBy.timeTop = getSortWinners('time', 'ASC');
    sortBy.winsBottom = getSortWinners('wins', 'ASC');
    sortBy.timeBottom = getSortWinners('time', 'DESC');
  });
};

const clickSort = (element:HTMLButtonElement, wins:boolean) => {
  if (element.classList.contains('bottom')) {
    element.classList.remove('bottom');
    if (wins) {
      showWinnersCars(sortBy.winsTop);
    } else {
      showWinnersCars(sortBy.timeTop);
    }
  } else {
    element.classList.add('bottom');
    if (wins) {
      showWinnersCars(sortBy.winsBottom);
    } else {
      showWinnersCars(sortBy.timeBottom);
    }
  }
};

export const sortWinners = (e:Event):void => {
  if (window.location.hash === '#winners') {
    const sortWin = document.querySelector('.table-winners__wins') as HTMLButtonElement;
    const sortTime = document.querySelector('.table-winners__time') as HTMLButtonElement;
    if (e.target === sortWin) {
      clickSort(sortWin, true);
    }
    if (e.target === sortTime) {
      clickSort(sortTime, false);
    }
  }
};
