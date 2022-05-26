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

export let current: Element | null = null;

export const setAvailable = () => {
  const $itemList = getDomElements('.ordered-item');
  const $coffeeList = getDomElements('.coffee-category-button');
  const coffeeFilling = getDomElement('.filling') as HTMLDivElement;
  const availableList: string[] = [];

  $itemList.forEach(item => {
    const content = item.firstElementChild?.nextElementSibling?.textContent || '';

    if (!availableList.includes(content)) {
      availableList.push(content);
    }
  });

  $coffeeList.forEach(coffee => {
    coffee.addEventListener('click', () => {
      if (current) {
        coffeeFilling.classList.remove(current.id);
        current.classList.remove('selected');
      }

      if (coffee.textContent && !availableList.includes(coffee.textContent)) {
        alert('경고창 : Cannot make Error');
      } else {
        current = coffee;
        coffeeFilling.classList.add(current.id);
        current.classList.add('selected');
      }
    });
  });
};

const getOrderedList = (target: string | null) => {
  console.log(target);
};

export const setModal = (target: string | null) => {
  const modalHeader = getDomElement('.modal-header');
  const modalTitle = modalHeader?.lastElementChild as HTMLElement;
  modalTitle.textContent = `${target} 옵션`;

  getOrderedList(target);
};

export const makeEvent = () => {
  const addCoffeeOptionsForm = getDomElement('.coffee-add-area form') as HTMLFormElement;
  const modalLayout = getDomElement('.modal-layout') as HTMLDivElement;
  const selectedItem = getDomElement('.selected');
  // if ($itemList.length === 0) {
  //   alert('경고창 : No Order List Error');
  // }
  if (current === null || !selectedItem) {
    alert('경고창 : Nothing selected Error');
  } else {
    setModal(selectedItem.textContent);
    addCoffeeOptionsForm.addEventListener('submit', e => {
      e.preventDefault();
      modalLayout.classList.toggle('hidden');
    });

    modalLayout.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLElement;
      if ($target.matches('#close-icon')) {
        modalLayout.classList.toggle('hidden');
      }
    });
  }
};
