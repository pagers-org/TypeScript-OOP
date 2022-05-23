import { getDomElements, toggleBooleanAttribute } from './dom';
import { setBtnEvent } from './events';

export const editItem = (itemId: string) => {
  const $itemList = getDomElements('.ordered-item');
  $itemList.forEach(item => {
    if (itemId === item.id) {
      toggleBooleanAttribute(item, 'contenteditable');
    }
  });

  setBtnEvent();
};
