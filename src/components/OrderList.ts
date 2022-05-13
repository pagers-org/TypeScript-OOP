import { Order, Orders } from '@/domain';
import { createElement } from '@/common';
import { beverageService, optionService, orders } from '@/main';
import { nanoid } from 'nanoid';

export class OrderList extends HTMLElement {
  private $container!: HTMLElement;
  private $orderButton!: HTMLElement;

  connectedCallback() {
    this.init();

    this.events();
  }

  init() {
    this.$container = createElement(this.template());
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;

    this.replaceWith(this.$container);
  }

  events() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      const beverage = beverageService.createRandomBeverage();
      const optionGroups = optionService.createRandomSelectedOptionGroups();
      const order = new Order(nanoid(), beverage.id, optionGroups);

      orders.add(order);

      dispatchEvent(new CustomEvent(Orders.EVENT_ADDED, { detail: { order } }));

      const $orderTable = this.$container.querySelector('#order-table');
      const $template = createElement(this.createRow(beverage.name, order));

      $template.querySelector('.remove-order')?.addEventListener('click', e => {
        e.preventDefault();

        orders.remove(order);
        $template.remove();

        dispatchEvent(new CustomEvent(Orders.EVENT_REMOVED, { detail: { order } }));
      });

      $template.querySelector('.edit-order')?.addEventListener('click', e => {
        e.preventDefault();

        const key = 'contentEditAble';

        const contentEditAble = $template.getAttribute(key);

        if (contentEditAble === 'true') {
          $template.removeAttribute(key);
        } else {
          $template.setAttribute(key, 'true');
        }
      });

      $orderTable?.appendChild($template);
    });
  }

  createRow(beverageName: string, order: Order) {
    return `
    <div class='table-row'>
        <div class='cell' data-title='No'>${orders.size()}</div>
        <div class='cell' data-title='메뉴명'>${beverageName}</div>
        <div class='cell' data-title='사이즈'>${order.getSelectedOptionValue('사이즈')}</div>
        <div class='cell' data-title='샷'>${order.getSelectedOptionValue('샷')}</div>
        <div class='cell' data-title='시럽'>${order.getSelectedOptionValue('시럽')}</div>
        <div class='cell' data-title='ICE/HOT'>${order.getSelectedOptionValue('ICE/HOT')}</div>
        <div class='cell' data-title='얼음 종류'>${order.getSelectedOptionValue('얼음 종류')}</div>
        <div class='cell' data-title='휘핑 크림'>${order.getSelectedOptionValue('휘핑 크림')}</div>
        <div class='cell' data-title='엑스트라'>${order.getSelectedOptionValue('엑스트라')}</div>
        <div class='cell' data-title='컵'>${order.getSelectedOptionValue('컵')}</div>
        <div class='cell' data-title='수정하기'>
          <span class='edit-order'><i class='fa-solid fa-pen'></i></span>
        </div>
        <div class='cell' data-title='삭제하기'>
          <span class='remove-order'><i class='fa-solid fa-trash-can'></i></span>
        </div>
    </div>
    `;
  }

  template() {
    return `
<div class='order-list'>
  <h1>주문 목록</h1>
  <div class='order-button-area'>
    <button class='order-button'>주문 받기</button>
  </div>
  <div class='wrapper'>
    <div class='table' id='order-table'>
      <div class='table-row header'>
        <div class='cell'>No</div>
        <div class='cell'>메뉴명</div>
        <div class='cell'>사이즈</div>
        <div class='cell'>샷</div>
        <div class='cell'>시럽</div>
        <div class='cell'>ICE/HOT</div>
        <div class='cell'>얼음 종류</div>
        <div class='cell'>휘핑 크림</div>
        <div class='cell'>엑스트라</div>
        <div class='cell'>컵</div>
        <div class='cell'>수정하기</div>
        <div class='cell'>삭제하기</div>
      </div>
    </div>
  </div>
</div>    
    `;
  }
}
