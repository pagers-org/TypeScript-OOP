import { getDomElement } from './dom';
import { setOrderBtnEvent } from './events';
import { setKitchen } from './kitchen';

const pageNav = getDomElement('header') as HTMLHeadElement;
const addCoffeeOptionsForm = getDomElement('.coffee-add-area form') as HTMLFormElement;
const modalLayout = getDomElement('.modal-layout') as HTMLDivElement;

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

addCoffeeOptionsForm.addEventListener('submit', event => {
  event.preventDefault();
  modalLayout.classList.toggle('hidden');
});

modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});

setKitchen();
setOrderBtnEvent();
