import OrderList from './OrderList';
import Kitchen from './Kitchen';

import { DOM } from './constants';
import { $ } from './utils/dom';
class App {
  orderList;
  kitchen;

  constructor() {
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
      this.orderList.handleTableClick(event);
      this.checkKitchen();
    });
  }

  checkKitchen() {
    if (!this.orderList.getOrderLength()) this.kitchen.closeKitchen();
    else this.kitchen.openKitchen();
  }
}

export default App;
