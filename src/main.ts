import { getDomElement } from './dom';
import { setOrderBtnEvent } from './events';
import { setKitchen } from './kitchen';

const pageNav = getDomElement('header') as HTMLHeadElement;

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

setKitchen();
setOrderBtnEvent();
