import Coffee from '../model/Coffee';
import Option from '../model/Option';
import CoffeeService from '../services/CoffeeService';
import { findById } from '../utils';

type Order = {
  id: number;
  editable: boolean;
  coffee: Coffee;
  options: Option[];
  orderedAt: Date;
  deliveredAt: Date | null;
};

export type OrdersState = { orders: Order[] };

class OrderList implements Component, Observable {
  private $root: HTMLElement;
  private state: OrdersState = { orders: [] };
  private observers$ = new Set();

  private static uniqueIdCnt = 0;

  constructor($root: HTMLElement | null) {
    if (!$root) throw new Error('root element is required to render');
    this.$root = $root;
    this.init();
  }

  init() {
    this.setEvent();
  }

  subscribe<OrdersState>(_cb: (s: OrdersState) => void) {
    const callback = _cb;
    this.observers$.add(callback);
    return {
      unsubscribe: () => this.observers$.delete(callback),
    };
  }

  next() {
    this.observers$.forEach(cb => typeof cb === 'function' && cb(this.state));
  }

  render() {
    const $orderTable = this.$root.querySelector('#order-table');
    if (!($orderTable instanceof Element)) return;
    $orderTable.innerHTML = this.template();
  }

  setState<OrdersState>(state: OrdersState) {
    this.state = { ...this.state, ...state };
    this.render();
    this.next();
  }

  setEvent(): void {
    this.$root.addEventListener('click', ({ target }) => {
      if (!(target instanceof Element)) return false;
      if (target.classList.contains('order-button')) return this.addOrder();

      const $table = target.closest('.table-row');
      if (!($table instanceof HTMLElement) || !target.parentElement) return false;

      if (target.parentElement.classList.contains('edit-order')) return this.editOrderById($table.dataset.id);
      if (target.parentElement.classList.contains('update-order')) return this.updateOrderById($table.dataset.id);
      if (target.parentElement.classList.contains('remove-order')) return this.deleteOrderById($table.dataset.id);
    });
  }

  private updateOrderById(id: string | undefined) {
    if (!id) return;
    const order = findById(this.state.orders, Number(id));
    if (!order) return;
    const $order = this.$root.querySelector(`.order-list-${order.id}`);
    if (!($order instanceof HTMLElement)) return;

    const optionValues = Array.from($order.childNodes).reduce<string[]>((acc, currNode) => {
      if (!(currNode instanceof HTMLDivElement) || !currNode.isContentEditable) return acc;
      return [...acc, currNode.textContent || ''];
    }, []);

    order.options.forEach((option, index) => option.setValue(optionValues[index]));

    this.setState({
      orders: this.state.orders.map(order => (order.id === order.id ? { ...order, editable: false } : order)),
    });
  }

  private editOrderById(id: string | undefined) {
    if (!id) return;
    const order = findById(this.state.orders, Number(id));
    if (!order) return;
    this.setState({
      orders: this.state.orders.map(order => (order.id === order.id ? { ...order, editable: true } : order)),
    });
  }

  private async deleteOrderById(id: string | undefined) {
    if (!id) return;
    const order = findById(this.state.orders, Number(id));
    if (!order) return;
    this.setState({ orders: this.state.orders.filter(v => v.id !== order.id) });
  }

  private getUniqueId() {
    return (OrderList.uniqueIdCnt += 1);
  }

  private getNewOrder(): Order {
    return {
      id: this.getUniqueId(),
      editable: false,
      coffee: CoffeeService.getRandomCoffee(),
      options: CoffeeService.getRandomOptions(),
      orderedAt: new Date(),
      deliveredAt: null,
    };
  }

  private addOrder() {
    this.setState({ orders: [...this.state.orders, this.getNewOrder()] });
  }

  template() {
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
        ${this.state.orders
          .map(
            order => `
        <div class="table-row order-list-${order.id}" data-id="${order.id}">
          <div class="cell" data-title="No">${order.id}</div>
          <div class="cell" data-title="메뉴명">${order.coffee.name}</div>
          ${order.options
            .map(
              option =>
                `<div class="cell" ${
                  order.editable ? 'contenteditable' : ''
                } data-title="${option.getTitle()}">${option.getValue()}</div>`,
            )
            .join('')}
          <div class="cell" data-title="수정하기">
            <span class="${order.editable ? 'update-order' : 'edit-order'}"><i class="fa-solid ${
              order.editable ? 'fa-save' : 'fa-pen'
            }"></i></span>
          </div>
          <div class="cell" data-title="삭제하기">
            <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
          </div>
        </div>
      `,
          )
          .join('')}
    `;
  }
}

export default OrderList;
