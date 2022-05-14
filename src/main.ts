import './View/OrderList/OrderList';

let currentElement: HTMLButtonElement | null = null;
const pageNav = document.querySelector('header') as HTMLHeadElement;
const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

buttons.forEach(button =>
  button.addEventListener('click', () => {
    if (currentElement) {
      currentElement.classList.remove('selected');
      coffeeFilling.classList.remove(currentElement.id);
    }

    currentElement = button;
    coffeeFilling.classList.add(currentElement.id);
    currentElement.classList.add('selected');
    coffeeName.innerText = button.innerText;
  }),
);

addCoffeeOptionsForm.addEventListener('submit', event => {
  event.preventDefault();
  modalLayout.classList.toggle('hidden');
});

modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});
