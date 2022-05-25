import type OrderRow from '@/View/Components/OrderRow';
import { dispatch } from '@/Stores/orderStore';
import OrderFactory from '@/Model/OrderFactory';

class OrderTable {
  $orderTable = document.getElementById('order-table')!;
  $newOrderButton = document.getElementById('new-order')!;

  bindEvent = () => {
    this.$newOrderButton.addEventListener('click', () => {
      const $order = document.createElement('cafe-order-row') as OrderRow;
      const orderFactory = new OrderFactory();
      const newOrder = orderFactory.createRandomOrder();
      dispatch({ type: 'add', payload: newOrder });
      $order.setOrder(newOrder);

      this.$orderTable.appendChild($order);
    });
  };
}

export default new OrderTable();