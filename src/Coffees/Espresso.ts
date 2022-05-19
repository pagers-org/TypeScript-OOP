import Coffee, { CoffeeEnum } from './Coffee';

class Espresso extends Coffee {
  name = CoffeeEnum.espresso;

  ingredients = {
    coffe: 4,
  } as const;

  //
}

export default Espresso;
