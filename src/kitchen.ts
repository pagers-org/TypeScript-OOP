import { getDomElement, getDomElements, setInnerHTML } from './dom';
import { setAvailable, makeEvent } from './events';
import { EMPTY_KITCHEN_TEMPLATE, KITCHEN_TEMPLATE } from './template';

export const setKitchen = () => {
  const $kitchen = getDomElement('#right-section') as HTMLElement;
  const $itemList = getDomElements('.ordered-item');

  if ($itemList.length === 0) {
    setInnerHTML($kitchen, EMPTY_KITCHEN_TEMPLATE);
  } else {
    setInnerHTML($kitchen, KITCHEN_TEMPLATE);
  }
  setAvailable();

  const $btnMakeCoffee = getDomElement('.coffee-add-options-button') as HTMLElement;
  $btnMakeCoffee?.addEventListener('click', makeEvent);
};
