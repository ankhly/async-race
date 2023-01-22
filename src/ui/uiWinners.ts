import { renderSVG } from './uiGarage';

export function renderWinnersPage():string {
  const pageBody = document.querySelector('.page__body') as HTMLElement;
  pageBody.innerHTML = '';
  const pageWinners = `<div class="page__winners winners-page">
  <div class="winners-page__body">
    <h2 class="winners-page__title">Winners (<span>0</span>)</h2>
    <h2 class="winners-page__sub-title">Page # <span>1</span></h2>
    <div class="winners-page__table table-winners">
      <div class="table-winners__winner winner">
        <div class="table-winners__num">Number</div>
        <div class="table-winners__car">Car</div>
        <div class="table-winners__name">Name</div>
        <button class="table-winners__wins">Wins</button>
        <button class="table-winners__time">Best time (seconds)</button>
      </div>
      <div class="table-winners__body"></div>
    </div>
  </div>
</div>`;
  pageBody.insertAdjacentHTML('beforeend', pageWinners);
  return pageWinners;
}

export function renderWinnersCar(color:string, carName:string, carWins:number, carTime:number, num:number):string {
  const winnersBody = document.querySelector('.table-winners__body') as HTMLElement;
  const WinnerCar = `
  <div class="table-winners__winner winner">
    <div class="winner__num">${num}</div>
    <div class="winner__car"> ${renderSVG(color, '60px', '40px')}</div>
    <div class="winner__name">${carName}</div>
    <div class="winner__wins">${carWins}</div>
    <div class="winner__time">${carTime}</div>
  </div>`;
  winnersBody.insertAdjacentHTML('beforeend', WinnerCar);
  return WinnerCar;
}
