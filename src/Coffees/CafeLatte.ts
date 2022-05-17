import Coffee, { CoffeeEnum } from './Coffee';

class CafeLatte extends Coffee {
  name = CoffeeEnum.latte;

  ingredients = {
    coffee: 5,
    hotMilk: 4,
    milkFoam: 2,
  } as const;
}

export default CafeLatte;
