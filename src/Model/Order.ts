import Drink from '@/Model/Drink';

// 주문을 set하는 순간부터 생성
class Order {
  id: number;
  drinks: Drink[] = [];
  orderTime = -1;
  finishTime = -1;

  constructor(id: number, drink: Drink) {
    this.id = id;
    this.drinks.push(drink);
  }

  addDrink(drink: Drink) {
    this.drinks.push(drink);
  }

  deleteDrink(index: number) {
    this.drinks.splice(index, 1);
  }

  private recordNow() {
    return new Date().getUTCMilliseconds();
  }

  setOrderInPlace() {
    this.orderTime = this.recordNow();
  }

  finishOrder() {
    this.finishTime = this.recordNow();
  }
}

export default Order;
