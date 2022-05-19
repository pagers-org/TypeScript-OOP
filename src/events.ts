import { v4 as getUniqueID } from 'uuid';
import { generateRandomOrder } from './add';
import { getDomElement, getDomElementId, getDomElements, setInnerHTML } from './dom';
import { editItem } from './edit';
import { setKitchen } from './kitchen';
import { removeItem } from './remove';
import { getOrderRow } from './template';

const removeElement = (e: Event) => {
  const targetId = getDomElementId((e.target as HTMLElement).closest('.ordered-item'));
  if (targetId) removeItem(targetId);
};

const editElement = (e: Event) => {
  const targetId = getDomElementId((e.target as HTMLElement).closest('.table-row'));
  if (targetId) editItem(targetId);
};

export const setBtnEvent = () => {
  const btnsEdit = getDomElements('.edit-order');
  const btnsRemove = getDomElements('.remove-order');

  btnsEdit.forEach(btn => {
    btn.addEventListener('click', editElement);
  });

  btnsRemove.forEach(btn => {
    btn.addEventListener('click', removeElement);
  });
};

export const setOrderBtnEvent = () => {
  const btnOrder = getDomElement('.order-button') as HTMLButtonElement;

  btnOrder.addEventListener('click', () => {
    const orderItems = generateRandomOrder();
    const $orderTable = getDomElement('.table') as HTMLTableElement;
    const $newRow = document.createElement('div');
    $newRow.id = getUniqueID();
    $newRow.className = 'table-row';
    $newRow.classList.add('ordered-item');
    setInnerHTML($newRow, getOrderRow(orderItems));
    $orderTable.appendChild($newRow);
    setBtnEvent();
    setKitchen();
  });
};
