import {
  getGarage, startEngine, stopEngine, drive,
} from '../api/apiGarage';
import { AnimObj, MoveCar } from '../utils/type';
import { getWinnerRace } from '../winners/winners';

let width = document.body.scrollWidth;
width = width > 1440 ? width = 1440 : document.body.scrollWidth;
window.addEventListener('resize', () => {
  width = document.body.scrollWidth;
  width = width > 1440 ? width = 1440 : document.body.scrollWidth;
});

const anim :AnimObj = {};
let isWin:boolean;

const animationCar = (element : HTMLElement, htmlWidth:number, animTime:number, idCar:number, getWin:boolean) => {
  let start = 0;
  const stateAnim:{ idAnim: number; } = { idAnim: 0 };
  const dateStart = new Date().getTime();
  isWin = true;
  const move = (time:number) => {
    if (!start) {
      start = time;
    }
    const step = time - start;
    const draw = step * (htmlWidth / animTime);
    element.style.left = `${100 + draw}px`;
    if (draw < htmlWidth) {
      stateAnim.idAnim = window.requestAnimationFrame(move);
    }
    if (draw >= htmlWidth && isWin && getWin) {
      getWinnerRace(idCar, dateStart);
      isWin = false;
    }
    return time;
  };
  stateAnim.idAnim = window.requestAnimationFrame(move);
  return stateAnim;
};

const raceAll = (autos:NodeListOf<Element>, arrPromise:Array<Promise<MoveCar>>,
  arrId:Array<number>, btnElement : HTMLButtonElement) => {
  Promise.all(arrPromise).then((e) => {
    btnElement.style.visibility = 'visible';
    e.forEach((j, i) => {
      const auto = autos[i] as HTMLElement;
      if (auto) {
        const timeRase = j.distance / j.velocity;
        anim[arrId[i]] = animationCar(auto, width - 230, timeRase, arrId[i], true);
        drive(arrId[i]).then((success) => {
          if (!success) {
            cancelAnimationFrame(anim[arrId[i]].idAnim);
          }
        });
      }
    });
  });
};

const rasetAll = (autos:NodeListOf<Element>, arrId:Array<number>, btnElement : HTMLButtonElement) => {
  arrId.forEach((id, i) => {
    stopEngine(id).then(() => {
      const auto = autos[i] as HTMLElement;
      if (auto) {
        if (anim[arrId[i]]) {
          window.cancelAnimationFrame(anim[arrId[i]].idAnim);
        }
        auto.style.left = `${(100)}px`;
        btnElement.style.visibility = 'visible';
      }
    });
  });
};

const startCar = (id:number, element : HTMLElement, btnElement : HTMLButtonElement) => {
  startEngine(id).then((i) => {
    btnElement.style.visibility = 'visible';
    const time = i.distance / i.velocity;
    anim[id] = animationCar(element, width - 230, time, id, false);
    drive(id).then((success) => {
      if (!success) {
        cancelAnimationFrame(anim[id].idAnim);
      }
    });
  });
};

const stopCar = (id:number, element : HTMLElement, btnElement : HTMLButtonElement) => {
  stopEngine(id).then(() => {
    btnElement.style.visibility = 'visible';
    if (anim[id]) {
      window.cancelAnimationFrame(anim[id].idAnim);
    }
    element.style.left = `${(100)}px`;
  });
};

export const controlRace = (e:Event, raceBtn:HTMLButtonElement, recetBtn:HTMLButtonElement):void => {
  let arrPromisesStart:Array<Promise<MoveCar>> = [];
  let arrIds:Array<number> = [];
  const bodyAutos = document.querySelectorAll('.car-page__body') as NodeListOf<Element>;
  const autos = document.querySelectorAll('.play-car__auto') as NodeListOf<Element>;
  for (let i = 0; i < bodyAutos.length; i++) {
    const bodyAuto = bodyAutos[i] as HTMLElement;
    const id = Number(bodyAuto.dataset.id);
    arrIds.push(id);
    arrPromisesStart.push(startEngine(id));
  }
  arrIds = [...new Set(arrIds)];
  arrPromisesStart = [...new Set(arrPromisesStart)];
  if (e.target === raceBtn) {
    raceBtn.style.visibility = 'hidden';
    raceAll(autos, arrPromisesStart, arrIds, recetBtn);
  }
  if (e.target === recetBtn) {
    recetBtn.style.visibility = 'hidden';
    rasetAll(autos, arrIds, raceBtn);
  }
};

export const controlCar = (e:Event):void => {
  getGarage().then((el) => {
    for (let i = 0; i < el.length; i++) {
      const carBody = document.querySelector(`[data-id = "${(el[i].id)}"]`) as HTMLElement;
      if (carBody) {
        const btnDrive = carBody.querySelector('.play-car__drive') as HTMLButtonElement;
        const btnStop = carBody.querySelector('.play-car__stop') as HTMLButtonElement;
        const auto = carBody.querySelector('.play-car__auto') as HTMLElement;
        if (e.target === btnDrive) {
          startCar(el[i].id, auto, btnStop);
          btnDrive.style.visibility = 'hidden';
        }
        if (e.target === btnStop) {
          stopCar(el[i].id, auto, btnDrive);
          btnStop.style.visibility = 'hidden';
        }
      }
    }
  });
};
