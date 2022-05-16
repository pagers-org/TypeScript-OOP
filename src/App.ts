import { CoffeeMakeModal, OrderList, Kitchen } from './components';

import { DOM, ERROR } from './constants';
import { $ } from './utils/dom';
import { MenuName } from './@types';

class App {
  $target;
  coffeMakeModal;
  orderList;
  kitchen;

  constructor($target: HTMLDivElement) {
    this.$target = $target;
    this.coffeMakeModal = new CoffeeMakeModal();
    this.orderList = new OrderList();
    this.kitchen = new Kitchen();
    this.addEvents();
    this.checkKitchen();
  }

  addEvents() {
    $(`#${DOM.APP_ID}`).addEventListener('click', this.handleAppClick.bind(this));
    $(`#${DOM.APP_ID}`).addEventListener('submit', this.handleAppSubmit.bind(this));
  }

  handleAppClick(event: MouseEvent) {
    const target = event.target as Element;

    if (target.closest('span')?.className === DOM.ORDER_EDIT_BUTTON_CLASS) {
      const clickId = target.closest(`.${DOM.ORDER_TABLE_ROW_CLASS}`)?.getAttribute('data-id');
      this.orderList.changeTableRowToEditable(clickId);
    }
    if (target.closest('span')?.className === DOM.ORDER_REMOVE_BUTTON_CLASS) {
      const clickId = target.closest(`.${DOM.ORDER_TABLE_ROW_CLASS}`)?.id;
      this.orderList.removeTableRow(clickId);
      this.checkKitchen();
    }
    if (target.className === DOM.ORDER_BUTTON_CLASS) {
      this.orderList.addOrder();
      this.checkKitchen();
    }
    if (target.classList.contains(DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS)) {
      const clickCoffeName = target.textContent as MenuName;
      if (!this.kitchen.isExistClickMenuName(this.orderList.getCurrentOrderMenuNames(), clickCoffeName)) {
        alert(ERROR.NON_EXIST_SELECTED_COFFEE_ORDER);
        return;
      }
      this.kitchen.fillingCoffee(event.target as HTMLButtonElement);
    }
  }

  handleAppSubmit(event: SubmitEvent) {
    event.preventDefault();
    const target = event.target as Element;

    if (target.id === DOM.KITCHEN_COFFEE_MAKE_BUTTON_ID) {
      if (!this.kitchen.$selectedCoffee) {
        alert(ERROR.NON_EXIST_SELECTED_COFFEE);
        return;
      }
      this.coffeMakeModal.toggleModal();
    }
  }

  checkKitchen() {
    if (!this.orderList.getOrderTotalLength()) this.kitchen.closeKitchen();
    else this.kitchen.openKitchen();
  }
}

export default App;
