import Coffee, { CoffeeEnum } from './Coffee';

class Lungo extends Coffee {
  name = CoffeeEnum.lungo;

  ingredients = {
    coffe: 5,
    water: 5,
  } as const;
}

export default Lungo;
