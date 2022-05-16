import App from './App';

import { DOM } from './constants';
import { $ } from './utils/dom';

const pageNav = document.querySelector('header') as HTMLHeadElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});

new App($(`#${DOM.APP_ID}`));
