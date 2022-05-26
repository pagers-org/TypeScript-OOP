export class OrderManagement {
  get orderCount() {
    return document.querySelectorAll('#order-table .table-row').length - 1;
  }

  deleteOrder() {

  }
}
