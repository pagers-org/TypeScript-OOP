import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class CafeAuLait extends Coffee implements ICoffe {
  name = CoffeeEnum.au_lait;

  ingredients = {
    coffee: 5,
    milk: 5,
  } as const;

  constructor() {
    super();
  }
}

export default CafeAuLait;
