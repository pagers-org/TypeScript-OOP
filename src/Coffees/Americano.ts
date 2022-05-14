import Coffee, { CoffeeEnum } from './Coffee';

class Americano extends Coffee {
  name = CoffeeEnum.americano;

  ingredients = {
    water: 6,
    coffe: 4,
  } as const;
}

export default Americano;
