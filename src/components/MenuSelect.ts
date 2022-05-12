import { createElement } from '@/common';
import { Orders } from '@/domain';
import { beverageService, menu, modalLayout, orders } from '@/main';

const CLASS_NAME_NONE_ORDER = 'none-order';
const CLASS_NAME_SELECTED = 'selected';
const CLASS_NAME_HIDDEN = 'hidden';

const MSG_ALERT = '주문을 추가하세요';

export class MenuSelect extends HTMLElement {
  private $container!: HTMLElement;
  private $buttonContainer!: HTMLElement;
  private $form!: HTMLElement;

  connectedCallback() {
    this.init();

    this.createMenus();

    this.events();
  }

  init() {
    this.$container = createElement(this.template());
    this.$buttonContainer = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;
    this.replaceWith(this.$container);
  }

  events() {
    addEventListener(Orders.EVENT_ADDED, e => {
      e.preventDefault();

      if (this.$container.classList.contains(CLASS_NAME_NONE_ORDER)) {
        this.$container.classList.remove(CLASS_NAME_NONE_ORDER);
      }

      const { order } = (e as CustomEvent).detail;
      const button = this.$container.querySelector(`[data-beverage-id="${order.beverageId}"]`);
      button?.classList.add(CLASS_NAME_SELECTED);
    });

    addEventListener(Orders.EVENT_REMOVED, e => {
      e.preventDefault();

      const { order } = (e as CustomEvent).detail;
      const button = this.$container.querySelector(`[data-beverage-id="${order.beverageId}"]`);

      if (orders.isEmptyByBeverageId(order.beverageId)) {
        button?.classList.remove(CLASS_NAME_SELECTED);
      }

      if (orders.isEmpty()) {
        this.$container.classList.add(CLASS_NAME_NONE_ORDER);
      }
    });

    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      if (orders.isEmpty()) {
        return alert(MSG_ALERT);
      }

      modalLayout.classList.toggle(CLASS_NAME_HIDDEN);
    });
  }

  createMenus() {
    menu.menuItems.forEach(menuItem => {
      const beverage = beverageService.getById(menuItem.beverageId);
      const button = createElement(`<button class="coffee-category-button" id="ristretto">${beverage.name}</button>`);
      button.dataset['beverageId'] = String(beverage.id);
      this.$buttonContainer.appendChild(button);
    });
  }

  template() {
    return `
<div class='MenuSelect ${CLASS_NAME_NONE_ORDER}'>
  <h1>주방</h1>
  <div class="coffee-container">
    <h1 class="coffee_name">Choose your coffee</h1>
    <div class="cup">
      <div class="filling reset">
        <div class="coffee">커피</div>
        <div class="water">물</div>
        <div class="liquor">리퀴르</div>
        <div class="milk">우유</div>
        <div class="whipped_cream">휘핑 크림</div>
        <div class="milk_foam">밀크 폼</div>
        <div class="steamed_milk">데운 우유</div>
        <div class="chocolate">초콜릿</div>
      </div>
      <div class="plate"></div>
    </div>
  </div>
  <div class="select-coffee-container">
    <div class="row">
      <div class="buttons">
      </div>
    </div>
    <div class="row">
      <div class="coffee-add-area">
        <form>
          <button type="submit" class="coffee-add-options-button">만들기</button>
        </form>
      </div>
    </div>
  </div>
</div>    
    `;
  }
}
