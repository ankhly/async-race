const brands = ['Audi', 'BMW', 'Peugeot', 'Mercedes', 'Porsche',
  'Geely', 'Volvo', 'Tesla', 'Mitsubishi', 'Cadillac', 'Toyota'];
const models = ['A4', 'X7', '406', 'S-Class', '911', 'Atlas', 'XC60', 'Model S', 'Lancer', 'Eldorado', 'Celica'];

export const getRandomName = ():string => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
};

export const getRandomColor = ():string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const haveCarsPage = ():number => {
  const countCar = document.querySelectorAll('.car-page__body') as NodeListOf<Element>;
  return countCar.length;
};

export const showNumPage = (num:number):void => {
  const pageSubTitle = document.querySelector('.page__sub-title span') as HTMLElement;
  pageSubTitle.innerHTML = String(num);
};
