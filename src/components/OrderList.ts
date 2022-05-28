import Component from '../core/Component';
import Coffee from '../model/Coffee';
import Option from '../model/Option';
import CoffeeService from '../services/CoffeeService';
import { findById, generator, selectClosestFromTarget, selectTarget } from '../utils';

type Order = {
  id: number;
  editable: boolean;
  coffee: Coffee;
  options: Option[];
  orderedAt: Date;
  deliveredAt: Date | null;
};

export type OrdersState = { orders: Order[] };

class OrderList extends Component implements Observable {
  private state: OrdersState = { orders: [] };
  private observers$ = new Set();

  init() {
    this.setEvent();
  }

  subscribe<OrdersState>(callback: (s: OrdersState) => void) {
    this.observers$.add(callback);
    return {
      unsubscribe: () => this.observers$.delete(callback),
    };
  }

  next() {
    this.observers$.forEach(callback => typeof callback === 'function' && callback(this.state));
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
      if (!(target instanceof HTMLElement)) return false;

      if (target.classList.contains('order-button')) {
        return this.addOrder();
      }

      const title = selectClosestFromTarget(target, '[data-title]').dataset.title;
      const orderId = selectClosestFromTarget(target, '[data-order-id]').dataset.orderId;

      if (title === '수정하기') {
        return this.editOrderById(Number(orderId));
      }

      if (title === '저장하기') {
        return this.updateOrderById(Number(orderId));
      }

      if (title === '삭제하기') {
        return this.deleteOrderById(Number(orderId));
      }
    });
  }

  private updateOrderById(id: number) {
    const order = findById(this.state.orders, id);
    if (!order) return;

    const $order = selectTarget(`[data-order-id="${order.id}"]`);

    const optionValues = Array.from($order.childNodes).reduce((acc, currNode) => {
      if (!(currNode instanceof HTMLDivElement) || !currNode.isContentEditable) return acc;
      return [...acc, currNode.textContent || ''];
    }, [] as string[]);

    order.options.forEach((option, index) => option.setValue(optionValues[index]));

    this.setState({
      orders: this.state.orders.map(prevOrder =>
        prevOrder.id === order.id ? { ...order, editable: false } : prevOrder,
      ),
    });
  }

  private editOrderById(id: number) {
    const order = findById(this.state.orders, id);
    if (!order) return;
    this.setState({
      orders: this.state.orders.map(prevOrder =>
        prevOrder.id === order.id ? { ...order, editable: true } : prevOrder,
      ),
    });
  }

  private deleteOrderById(id: number) {
    const order = findById(this.state.orders, id);
    if (!order) return;
    this.setState({ orders: this.state.orders.filter(v => v.id !== order.id) });
  }

  private getNewOrder(): Order {
    return {
      id: generator.getUniqueId(),
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
        <div class="table-row" data-order-id="${order.id}">
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
          <div class="cell" data-title="${order.editable ? '저장하기' : '수정하기'}">
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
