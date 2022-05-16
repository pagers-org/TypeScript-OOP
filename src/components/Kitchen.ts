import { $ } from '../utils/dom.js';
import { KITCHEN_TEMPLATE } from '../templates';

import { MenuName } from '../@types/index.js';

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
    const $coffeeFilling = $('.filling') as HTMLDivElement;
    const $coffeeName = $('.coffee_name') as HTMLHeadingElement;

    if (this.$selectedCoffee) {
      this.$selectedCoffee.classList.remove('selected');
      $coffeeFilling.classList.remove(this.$selectedCoffee.id);
    }

    this.$selectedCoffee = clickButton;
    $coffeeFilling.classList.add(this.$selectedCoffee.id);
    this.$selectedCoffee.classList.add('selected');
    $coffeeName.innerText = clickButton.innerText;
  }

  isExistClickMenuName(currentOrderMenuNames: MenuName[], clickMenuName: MenuName) {
    return currentOrderMenuNames.includes(clickMenuName);
  }
}

export default Kitchen;
