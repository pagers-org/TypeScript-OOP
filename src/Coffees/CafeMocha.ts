import Coffee, { CoffeeEnum } from './Coffee';

class CafeMocha extends Coffee {
  name = CoffeeEnum.mocha;

  ingredients = {
    coffee: 4,
    chocolate: 2,
    hotMilk: 2,
    whippedCream: 2,
  } as const;
}

export default CafeMocha;
