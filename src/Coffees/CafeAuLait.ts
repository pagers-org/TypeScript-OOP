import Coffee, { CoffeeEnum } from './Coffee';

class CafeAuLait extends Coffee {
  name = CoffeeEnum.au_lait;

  ingredients = {
    coffee: 5,
    milk: 5,
  } as const;
}

export default CafeAuLait;
