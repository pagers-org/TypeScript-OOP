import Drink from '@/Model/Drink';
import OptionGroup from './OptionGroup';

// 주문을 set하는 순간부터 생성
class Order {
  id: string;
  drink: Drink;
  options: OptionGroup;
  orderTime = -1;
  finishTime = -1;

  constructor(id: string, drink: Drink, options: OptionGroup) {
    this.id = id;
    this.drink = drink;
    this.options = options;
  }
}

export default Order;
