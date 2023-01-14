export const savePageNum = (countPageNow:number):void => {
  localStorage.setItem('countPage', JSON.stringify(countPageNow));
};

// const getRoute = () => {
//  const name = window.location.hash ? window.location.hash.slice(1) : '';
//  return name;
// };
// let isCon = false;
// const handlerHash = () => {
//  const name = getRoute();
//  if (name === 'garage') {
//    if (!isCon) {
//      isCon = true;
//    }
//  }
// };

// window.addEventListener('hashchange', handlerHash);

// const a = [3, 5, 6];

// localStorage.setItem('data', JSON.stringify(a));

// const b = JSON.parse(localStorage.getItem('data')!);

// console.log(b);
