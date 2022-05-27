import View from '@/core/View';
import type OrderRow from '@/Components/OrderRow';
import { dispatch } from '@/Stores/orderStore/orderStore';
import OrderFactory from '@/Model/OrderFactory';

class OrderTable extends View {
  constructor() {
    super();
    this.bindEvents();
  }

  $orderTable = document.getElementById('order-table')!;
  $newOrderButton = document.getElementById('new-order')!;

  protected bindEvents = () => {
    this.$newOrderButton.addEventListener('click', () => {
      const $order = document.createElement('cafe-order-row') as OrderRow;
      const orderFactory = new OrderFactory();
      const newOrder = orderFactory.createRandomOrder();
      const componentId = $order.getComponentId();
      setTimeout(() => {
        dispatch({ type: 'add', payload: { componentId, order: newOrder } });
      }, 2000);

      this.$orderTable.appendChild($order);
    });
  };
}

export default new OrderTable();
