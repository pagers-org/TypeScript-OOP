import { getDomElements, toggleAttribute } from './dom';
import { setBtnEvent } from './events';

export const editItem = (itemId: string) => {
  const $itemList = getDomElements('.ordered-item');
  $itemList.forEach(item => {
    if (itemId === item.id) {
      toggleAttribute(item, 'contenteditable');
    }
  });

  setBtnEvent();
};
