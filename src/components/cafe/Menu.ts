import { createElement, addCustomEventListener, dispatchCustomEvent } from '@/common';
import { getBeverageById, MenuItem, Order } from '@/domain';
import { EVENT } from '@/constant';
import { Component } from '@/components';

const CLASS_NAME_NONE_ORDER = 'none-order';
const CLASS_NAME_SELECTED = 'selected';

const MSG_ALERT = '주문을 추가하세요';

export class Menu extends Component {
  private $form!: HTMLElement;
  private $buttons!: HTMLElement;

  init() {
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;
    this.$buttons = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;

    this.createMenus();
  }

  bindEvents() {
    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      e.preventDefault();

      const { order } = (e as CustomEvent).detail;

      this.addOrder(order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      e.preventDefault();

      const { order } = (e as CustomEvent).detail;

      this.removeOrder(order);
    });

    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      if (this.store.orders.isEmptyOrder()) {
        return alert(MSG_ALERT);
      }

      dispatchCustomEvent(EVENT.ORDER_SUBMIT);
    });
  }

  addOrder(order: Order) {
    if (this.$container.classList.contains(CLASS_NAME_NONE_ORDER)) {
      this.$container.classList.remove(CLASS_NAME_NONE_ORDER);
    }

    this.getButtonByOrder(order).classList.add(CLASS_NAME_SELECTED);
  }

  removeOrder(order: Order) {
    if (this.store.orders.isEmptyByBeverageId(order.beverageId)) {
      this.getButtonByOrder(order).classList.remove(CLASS_NAME_SELECTED);
    }

    if (this.store.orders.isEmptyOrder()) {
      this.toggle();
    }
  }

  getButtonByOrder(order: Order): HTMLElement {
    return this.$container.querySelector(`[data-beverage-id="${order.beverageId}"]`) as HTMLElement;
  }

  createMenus() {
    this.store.menu.menuItems.forEach((menuItem: MenuItem) => {
      const beverage = getBeverageById(menuItem.beverageId);
      const button = createElement(`<button class='coffee-category-button' id='ristretto'>${beverage.name}</button>`);
      button.dataset['beverageId'] = `${beverage.id}`;
      this.$buttons.appendChild(button);
    });
  }

  toggle() {
    this.$container.classList.toggle(CLASS_NAME_NONE_ORDER);
  }

  template() {
    return `
<div class='MenuSelect none-order'>
  <h1>주방</h1>
  <div class='coffee-container'>
    <h1 class='coffee_name'>Choose your coffee</h1>
    <div class='cup'>
      <div class='filling reset'>
        <div class='coffee'>커피</div>
        <div class='water'>물</div>
        <div class='liquor'>리퀴르</div>
        <div class='milk'>우유</div>
        <div class='whipped_cream'>휘핑 크림</div>
        <div class='milk_foam'>밀크 폼</div>
        <div class='steamed_milk'>데운 우유</div>
        <div class='chocolate'>초콜릿</div>
      </div>
      <div class='plate'></div>
    </div>
  </div>
  <div class='select-coffee-container'>
    <div class='row'>
      <div class='buttons'>
      </div>
    </div>
    <div class='row'>
      <div class='coffee-add-area'>
        <form>
          <button type='submit' class='coffee-add-options-button'>만들기</button>
        </form>
      </div>
    </div>
  </div>
</div>    
    `;
  }
}
