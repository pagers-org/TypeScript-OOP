import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class Cappuccino extends Coffee implements ICoffe {
  name = CoffeeEnum.Cappuccino;

  ingredients = {
    coffee: 3.5,
    hotMilk: 3,
    milkFoam: 3.5,
  } as const;

  constructor() {
    super();
  }
}

export default Cappuccino;
