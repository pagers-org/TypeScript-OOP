import { nanoid } from 'nanoid';

import Drink from '@/Model/Drink';
import OptionGroup from '@/Model/OptionGroup';

// 주문을 set하는 순간부터 생성
class Order {
  id: string;
  drink: Drink;
  optionGroups: OptionGroup[];
  orderTime = -1;
  finishTime = -1;

  constructor(drink: Drink, optionGroups: OptionGroup[]) {
    this.id = nanoid();
    this.drink = drink;
    this.optionGroups = optionGroups;
  }
}

export default Order;
