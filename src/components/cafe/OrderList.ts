import { EVENT } from '@/constant';
import { Component, OrderListRow } from '@/components';
import { createRandomOrder } from '@/domain';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;

  init() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  events() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      this.addOrder();
    });
  }

  addOrder() {
    const order = createRandomOrder();

    this.$orderTable.appendChild(OrderListRow.create(order, this.store));

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
