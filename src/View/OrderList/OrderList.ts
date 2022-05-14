import OrderRow from '@/View/OrderList/OrderRow/OrderRow';

import OrderController from '@/Controller/OrderController';

// 주문목록을 담당하는 view
class OrderList {
  orderTable = document.getElementById('order-table')!;
  newOrderButton = document.getElementById('new-order');
  orderController = OrderController;

  constructor() {
    this.events();
  }

  events = () => {
    this.newOrderButton?.addEventListener('click', () => {
      const drink = this.orderController.addDrink();

      const newRowNumber = this.orderTable.children.length;
      const newOrderRow = new OrderRow(newRowNumber, drink);

      this.orderTable.appendChild(newOrderRow.render());
    });
  };
}

export default new OrderList();
