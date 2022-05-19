import { getDomElement, getDomElements, setInnerHTML } from './dom';
import { EMPTY_KITCHEN_TEMPLATE, KITCHEN_TEMPLATE } from './template';

let current: Element | null = null;

export const setAvailable = () => {
  const $itemList = getDomElements('.ordered-item');
  const $coffeeList = getDomElements('.coffee-category-button');
  const coffeeFilling = getDomElement('.filling') as HTMLDivElement;
  const availableList: string[] = [];

  $itemList.forEach(item => {
    if (!availableList.includes(item.firstElementChild?.nextElementSibling?.textContent || '')) {
      availableList.push(item.firstElementChild?.nextElementSibling?.textContent || '');
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

export const setKitchen = () => {
  const $kitchen = getDomElement('#right-section');
  const $itemList = getDomElements('.ordered-item');

  if ($itemList.length === 0) {
    setInnerHTML($kitchen, EMPTY_KITCHEN_TEMPLATE);
  } else {
    setInnerHTML($kitchen, KITCHEN_TEMPLATE);
  }
  setAvailable();

  const $btnMakeCoffee = getDomElement('.coffee-add-options-button');
  $btnMakeCoffee?.addEventListener('click', e => {
    const selectedItem = getDomElement('.selected');
    // if ($itemList.length === 0) {
    //   alert('경고창 : No Order List Error');
    // }
    e.preventDefault();
    if (current === null || !selectedItem) {
      alert('경고창 : Nothing selected Error');
    } else {
      alert(`Success : ${selectedItem.textContent}`);
    }
  });
};
