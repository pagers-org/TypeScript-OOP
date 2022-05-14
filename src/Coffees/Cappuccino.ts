import Coffee, { CoffeeEnum } from './Coffee';

class Cappuccino extends Coffee {
  name = CoffeeEnum.cappuccino;

  ingredients = {
    coffee: 3.5,
    hotMilk: 3,
    milkFoam: 3.5,
  } as const;

  //
}

export default Cappuccino;
