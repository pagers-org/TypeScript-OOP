import { CoffeeMakeModal, Kitchen } from './components';
import { OrderList } from './domains';
import { KitchenView, OrderListView } from './views';
import { OrderListController } from './controllers/';

import { DOM, ERROR } from './constants';
import { $ } from './utils/dom';
import { MenuNameType } from './@types';

class App {
  private readonly $target: HTMLDivElement;
  private readonly coffeMakeModal: CoffeeMakeModal;
  private readonly orderListController: OrderListController;
  private readonly kitchen: Kitchen;

  constructor($target: HTMLDivElement) {
    this.$target = $target;
    this.coffeMakeModal = new CoffeeMakeModal();
    this.kitchen = new Kitchen();
    this.orderListController = new OrderListController(new OrderList(), OrderListView, KitchenView);
    this.addEvents();
    this.init();
  }

  private init() {
    if (!this.orderListController.getCurrentOrderLegnth()) KitchenView.close();
  }

  private addEvents() {
    $(`#${DOM.APP_ID}`).addEventListener('click', this.handleAppClick.bind(this));
    $(`#${DOM.APP_ID}`).addEventListener('submit', this.handleAppSubmit.bind(this));
  }

  private handleAppClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    this.orderListController.handleOrderListClickEvents(target);

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
}

export default App;
