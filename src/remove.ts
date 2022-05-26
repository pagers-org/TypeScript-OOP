import { getDomElement, getDomElements } from './dom';
import { setBtnEvent } from './events';
import { setKitchen } from './kitchen';

export const reorderItemList = () => {
  const $orderRows = getDomElements('.ordered-item');
  let orderIndex = 1;
  $orderRows.forEach(orderRow => {
    if (orderRow.firstElementChild) orderRow.firstElementChild.textContent = '' + orderIndex++;
  });
};

export const removeItem = (itemId: string) => {
  const $orderTable = getDomElement('#order-table');
  const $targetNode = document.getElementById(itemId);

  if ($targetNode) $orderTable?.removeChild($targetNode);

  setBtnEvent();
  reorderItemList();
  setKitchen();
};
