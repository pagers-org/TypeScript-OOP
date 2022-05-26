import Order from '@/modules/order';
import { OrderService } from '@/modules/order/service';

export class OrderListTable {
  private orderTable = document.querySelector('#order-table') as HTMLButtonElement;
  private orderButton = document.querySelector('.order-button') as HTMLButtonElement;
  private orderList: Order[] = [];
  orderService: OrderService = new OrderService();

  init() {
    this.orderTable.insertAdjacentHTML('beforebegin', this.headerTemplate());
    this.setEvents();
  }

  addOrder() {
    const order = new Order();
    this.orderService.add(order);
    this.orderList = this.orderService.listOrders();
  }

  removeOrder(deleteTarget: HTMLElement) {
    const orderId = deleteTarget.dataset.id as string;
    this.orderService.delete(orderId);
    this.orderList = this.orderService.listOrders();
  }

  setEvents() {
    this.orderButton.addEventListener('click', e => {
      e.preventDefault();
      this.addOrder();
      this.orderTable.insertAdjacentHTML(
        'beforeend',
        String.raw`${this.headerTemplate()}${this.orderList.map((order: Order) => this.rowTemplate(order)).join('')}`,
      );
    });

    this.orderTable?.addEventListener('click', e => {
      const target = e.target as HTMLButtonElement;
      const rootTarget = target.parentElement?.parentElement ?? target.parentElement;
      rootTarget?.querySelector('.remove-order')?.addEventListener('click', event => {
        const deleteTarget = (event.target as HTMLElement)?.closest('.table-row') as HTMLElement;
        this.removeOrder(deleteTarget);
        this.orderTable.innerHTML =
          this.headerTemplate() + this.orderList.map((order: Order) => this.rowTemplate(order)).join('');
      });
    });
  }
  headerTemplate() {
    return `
    <div class="table-row header">
                <div class="cell">No</div>
                <div class="cell">메뉴명</div>
                <div class="cell">사이즈</div>
                <div class="cell">샷</div>
                <div class="cell">시럽</div>
                <div class="cell">ICE/HOT</div>
                <div class="cell">얼음 종류</div>
                <div class="cell">휘핑 크림</div>
                <div class="cell">엑스트라</div>
                <div class="cell">컵</div>
                <div class="cell">수정하기</div>
                <div class="cell">삭제하기</div>
     </div> 
    `;
  }

  rowTemplate(order: Order) {
    const { id, menuName, size, shot, syrup, temperature, ice, whippedCream, extraOption, cup } = order;
    return `
        <div class="table-row" data-id='${id}'>
        <div class="cell" data-title="No">${id}</div>
        <div class="cell" data-title="메뉴명">${menuName}</div>
        <div class="cell" data-title="사이즈">${size}</div>
        <div class="cell" data-title="샷">${shot}</div>
        <div class="cell" data-title="시럽">${syrup}</div>
        <div class="cell" data-title="ICE/HOT">${temperature}</div>
        <div class="cell" data-title="얼음 종류">${ice}</div>
        <div class="cell" data-title="휘핑 크림">${whippedCream}</div>
        <div class="cell" data-title="엑스트라">${extraOption}</div>
        <div class="cell" data-title="컵">${cup}</div>
        <div class="cell" data-title="수정하기">
          <span class="edit-order" data-buttontype='edit' style='padding: 5px;'><i class="fa-solid fa-pen"></i></span>
        </div>
        <div class="cell" data-title="삭제하기">
          <span class="remove-order" data-buttontype='remove' style='padding: 5px;'><i class="fa-solid fa-trash-can"></i></span>
        </div>
      </div>
    `;
  }
}
