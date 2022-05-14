import { createElement } from '@/common';
import { MenuItem } from '@/domain';
import { beverageService, menu, orders } from '@/main';
import { EVENT } from '@/constant';
import { Component } from '@/components';

const CLASS_NAME_NONE_ORDER = 'none-order';
const CLASS_NAME_SELECTED = 'selected';

const MSG_ALERT = '주문을 추가하세요';

export class CafeMenu extends Component {
  private $buttonContainer!: HTMLElement;
  private $form!: HTMLElement;

  init() {
    this.$buttonContainer = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;

    this.toggle();
    this.createMenus();
  }

  events() {
    addEventListener(EVENT.ORDER_ADDED, e => {
      e.preventDefault();

      if (this.$container.classList.contains(CLASS_NAME_NONE_ORDER)) {
        this.$container.classList.remove(CLASS_NAME_NONE_ORDER);
      }

      const { order } = (e as CustomEvent).detail;
      const button = this.$container.querySelector(`[data-beverage-id="${order.beverageId}"]`);
      button?.classList.add(CLASS_NAME_SELECTED);
    });

    addEventListener(EVENT.ORDER_REMOVED, e => {
      e.preventDefault();

      const { order } = (e as CustomEvent).detail;
      const button = this.$container.querySelector(`[data-beverage-id="${order.beverageId}"]`);

      if (orders.isEmptyByBeverageId(order.beverageId)) {
        button?.classList.remove(CLASS_NAME_SELECTED);
      }

      if (orders.isEmpty()) {
        this.toggle();
      }
    });

    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      if (orders.isEmpty()) {
        return alert(MSG_ALERT);
      }

      dispatchEvent(new CustomEvent(EVENT.ORDER_SUBMIT));
    });
  }

  createMenus() {
    menu.menuItems.forEach((menuItem: MenuItem) => {
      const beverage = beverageService.getBeverageById(menuItem.beverageId);
      const button = createElement(`<button class='coffee-category-button' id='ristretto'>${beverage.name}</button>`);
      button.dataset['beverageId'] = `${beverage.id}`;
      this.$buttonContainer.appendChild(button);
    });
  }

  toggle() {
    this.$container.classList.toggle(CLASS_NAME_NONE_ORDER);
  }

  template() {
    return `
<div class='MenuSelect'>
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
