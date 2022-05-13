import Drink from '@/Model/Drink';

class Order {
  id: number;
  // 한 주문에 여러개의 Drink가 가능하다.
  drinks: Drink[] = [];
  orderTime = -1;
  finishTime = -1;

  // 뭘 주문할 것인지
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
