import { $ } from '../utils/dom.js';
import { KITCHEN_TEMPLATE } from '../templates';

import { MenuNameType } from '../@types/index.js';

class Kitchen {
  $target: HTMLElement;
  $selectedCoffee: HTMLButtonElement | null;

  constructor() {
    this.$target = $(`#right-section`);
    this.$selectedCoffee = null;
  }

  closeKitchen() {
    this.$target.innerHTML = KITCHEN_TEMPLATE.close();
  }

  openKitchen() {
    this.$target.innerHTML = KITCHEN_TEMPLATE.open();
  }

  fillingCoffee(clickButton: HTMLButtonElement) {
    const $coffeeFilling = $<HTMLDivElement>('.filling');
    const $coffeeName = $<HTMLHeadingElement>('.coffee_name');

    if (this.$selectedCoffee) {
      this.$selectedCoffee.classList.remove('selected');
      $coffeeFilling.classList.remove(this.$selectedCoffee.id);
    }

    this.$selectedCoffee = clickButton;
    $coffeeFilling.classList.add(this.$selectedCoffee.id);
    this.$selectedCoffee.classList.add('selected');
    $coffeeName.textContent = clickButton.textContent;
  }

  isExistClickMenuName(currentOrderMenuNames: MenuNameType[], clickMenuName: MenuNameType) {
    return currentOrderMenuNames.includes(clickMenuName);
  }
}

export default Kitchen;
