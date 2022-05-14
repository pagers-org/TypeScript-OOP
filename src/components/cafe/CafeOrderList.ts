import { Order } from '@/domain';
import { EVENT } from '@/constant';
import { beverageService, optionService, orders } from '@/main';
import { nanoid } from 'nanoid';
import { CafeOrderListRow, Component } from '@/components';

export class CafeOrderList extends Component {
  private $orderButton!: HTMLElement;
  private $orderTable!: HTMLElement;

  init() {
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
  }

  events() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      this.addOrder();
    });
  }

  addOrder() {
    const beverage = beverageService.createRandomBeverage();
    const optionGroups = optionService.createRandomSelectedOptionGroups();
    const order = new Order(nanoid(), beverage.id, optionGroups);

    this.$orderTable.appendChild(CafeOrderListRow.create(beverage.name, order));

    orders.add(order);

    dispatchEvent(new CustomEvent(EVENT.ORDER_ADDED, { detail: { order } }));
  }

  template() {
    return String.raw`
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
