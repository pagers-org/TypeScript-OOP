import OrderList from './OrderList';
import Kitchen from './Kitchen';
import CoffeeMakeModal from './CoffeeMakeModal';

import { DOM } from './constants';
import { $ } from './utils/dom';
import { MenuName } from './@types';
class App {
  $target;
  $coffeMakeModal;
  orderList;
  kitchen;

  constructor($target: HTMLDivElement) {
    this.$target = $target;
    this.$coffeMakeModal = new CoffeeMakeModal();
    this.orderList = new OrderList();
    this.kitchen = new Kitchen();

    this.addEvents();
    this.checkKitchen();
  }

  addEvents() {
    $(`.${DOM.ORDER_BUTTON_CLASS}`).addEventListener('click', () => {
      this.orderList.addOrder();
      this.checkKitchen();
    });
    $(`#${DOM.ORDER_TABLE_ID}`).addEventListener('click', event => {
      this.handleTableClick(event);
      this.checkKitchen();
    });
    $(`#${DOM.KITCHEN_SECTION_ID}`).addEventListener('click', event => {
      this.handleCoffeeCategoryClick(event);
    });
    $(`#${DOM.KITCHEN_SECTION_ID}`).addEventListener('submit', this.handleCoffeeAddOptionButtonClick.bind(this));
  }

  handleTableClick(event: Event) {
    const clickClassName = (event.target as Element).closest('span')?.className;
    const clickId = (event.target as Element).closest('.table-row')?.id;

    if (clickClassName === DOM.ORDER_EDIT_BUTTON_CLASS) {
      this.orderList.changeTableRowToEditable(clickId);
    }
    if (clickClassName === DOM.ORDER_REMOVE_BUTTON_CLASS) {
      this.orderList.removeTableRow(clickId);
    }
  }

  handleCoffeeCategoryClick(event: Event) {
    const clickClassName = (event.target as Element).classList;
    const clickCoffeeName = (event.target as Element).textContent as MenuName;

    if (clickClassName.contains(DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS)) {
      if (!this.kitchen.isExistClickMenuName(this.orderList.getCurrentOrderMenuNames(), clickCoffeeName)) {
        alert('선택된 커피의 주문이 없습니다.');
        return;
      }

      this.kitchen.fillingCoffee(event.target as HTMLButtonElement);
    }
  }

  handleCoffeeAddOptionButtonClick(event: Event) {
    event.preventDefault();
    if (!this.kitchen.$currentElement) {
      alert('선택된 커피가 없습니다.');
      return;
    }
    this.$coffeMakeModal.toggleModal();
  }

  checkKitchen() {
    if (!this.orderList.getOrderLength()) this.kitchen.closeKitchen();
    else this.kitchen.openKitchen();
  }
}

export default App;
