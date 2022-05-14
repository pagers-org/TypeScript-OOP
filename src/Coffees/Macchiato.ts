import Coffee, { CoffeeEnum } from './Coffee';

class Macchiato extends Coffee {
  name = CoffeeEnum.macchiato;

  ingredients = {
    coffe: 3,
    milkFoam: 7,
  } as const;
}

export default Macchiato;
