import Coffee, { CoffeeEnum } from './Coffee';

class Ristretto extends Coffee {
  name = CoffeeEnum.ristretto;

  ingredients = {
    coffe: 2,
  } as const;
}

export default Ristretto;
