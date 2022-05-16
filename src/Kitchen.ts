import { $ } from './utils/dom.js';
import { KITCHEN_TEMPLATE } from './templates/';

import { MenuName } from './@types/index.js';

class Kitchen {
  $target: HTMLElement;
  $currentElement: HTMLButtonElement | null;
  $modalLayout: HTMLDivElement;

  constructor() {
    this.$target = $(`#right-section`);
    this.$currentElement = null;
    this.$modalLayout = $('.modal-layout') as HTMLDivElement;
  }

  closeKitchen() {
    this.$target.innerHTML = KITCHEN_TEMPLATE.close();
  }

  openKitchen() {
    this.$target.innerHTML = KITCHEN_TEMPLATE.open();
  }

  fillingCoffee(clickButton: HTMLButtonElement) {
    const $coffeeFilling = $('.filling') as HTMLDivElement;
    const $coffeeName = $('.coffee_name') as HTMLHeadingElement;

    if (this.$currentElement) {
      this.$currentElement.classList.remove('selected');
      $coffeeFilling.classList.remove(this.$currentElement.id);
    }

    this.$currentElement = clickButton;
    $coffeeFilling.classList.add(this.$currentElement.id);
    this.$currentElement.classList.add('selected');
    $coffeeName.innerText = clickButton.innerText;
  }

  isExistClickMenuName(currentOrderMenuNames: MenuName[], clickMenuName: MenuName) {
    return currentOrderMenuNames.includes(clickMenuName);
  }
}

export default Kitchen;
