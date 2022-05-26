import { CoffeeMakeModal, Kitchen } from './components';
import { OrderList } from './domains';
import { OrderListView } from './views';
import { OrderListController } from './controllers/';

import { DOM, ERROR } from './constants';
import { $ } from './utils/dom';
import { MenuNameType } from './@types';

class App {
  private $target: HTMLDivElement;
  private coffeMakeModal: CoffeeMakeModal;
  private orderListController: OrderListController;
  private kitchen: Kitchen;

  constructor($target: HTMLDivElement) {
    this.$target = $target;
    this.coffeMakeModal = new CoffeeMakeModal();
    this.kitchen = new Kitchen();
    this.orderListController = new OrderListController(new OrderList(), OrderListView);
    this.addEvents();
    this.checkKitchen();
  }

  private addEvents() {
    $(`#${DOM.APP_ID}`).addEventListener('click', this.handleAppClick.bind(this));
    $(`#${DOM.APP_ID}`).addEventListener('submit', this.handleAppSubmit.bind(this));
  }

  private handleAppClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (this.orderListController.isClickOrderEditButton(target)) {
      this.orderListController.changeOrderToEditable(target);
    }

    if (this.orderListController.isClickOrderRemoveButton(target)) {
      this.orderListController.removeOrder(target);
      this.checkKitchen();
    }

    if (this.orderListController.isClickOrderAddButton(target)) {
      this.orderListController.addRandomOrder();
      this.checkKitchen();
    }

    if (target.classList.contains(DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS)) {
      const clickCoffeName = target.textContent as MenuNameType;
      if (!this.kitchen.isExistClickMenuName(this.orderListController.getCurrentOrderMenuNames(), clickCoffeName)) {
        alert(ERROR.NON_EXIST_SELECTED_COFFEE_ORDER);
        return;
      }
      this.kitchen.fillingCoffee(event.target as HTMLButtonElement);
    }
  }

  private handleAppSubmit(event: SubmitEvent) {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;

    if (!this.kitchen.$selectedCoffee) return alert(ERROR.NON_EXIST_SELECTED_COFFEE);

    if (target.id === DOM.KITCHEN_COFFEE_MAKE_BUTTON_ID) this.coffeMakeModal.toggleModal();
  }

  private checkKitchen() {
    if (!this.orderListController.getCurrentOrderLegnth()) {
      this.kitchen.closeKitchen();
      return;
    }

    this.kitchen.openKitchen();
  }
}

export default App;
