import { CoffeeOptions } from 'Coffee';
abstract class CoffeeMaker {
  private water: number;
  private coffee: number;
  private steamedMilk: number;
  private milkForm: number;
  private liquor: number;
  private chocolate: number;
  private whippedCream: number;
  private milk: number;

  constructor() {
    this.water = 0;
    this.coffee = 0;
    this.chocolate = 0;
    this.steamedMilk = 0;
    this.milkForm = 0;
    this.liquor = 0;
    this.whippedCream = 0;
    this.milk = 0;
  }

  get getAmericano() {
    this.water = 6;
    this.coffee = 4;
    return { water: this.water, coffee: this.coffee };
  }
  get getAulait() {
    this.milk = 6;
    this.coffee = 5;
    return { milk: this.milk, coffee: this.coffee };
  }
  get getCapuccino() {
    this.coffee = 3.5;
    this.steamedMilk = 3;
    this.milkForm = 3.5;
    return {
      coffee: this.coffee,
      steamedMilk: this.steamedMilk,
      milkForm: this.milkForm,
    };
  }
  get getCorretto() {
    this.coffee = 5.5;
    this.liquor = 2;
    return { coffee: this.coffee, liquor: this.liquor };
  }
  get getEspresso() {
    this.coffee = 4;
    return { coffee: this.coffee };
  }
  get getLatte() {
    this.coffee = 4;
    this.steamedMilk = 4;
    this.milkForm = 4;
    return {
      coffee: this.coffee,
      steamedMilk: this.steamedMilk,
      milkForm: this.milkForm,
    };
  }
  get getLungo() {
    this.water = 5;
    this.coffee = 5;
    return { water: this.water, coffee: this.coffee };
  }
  get getMacchiato() {
    this.coffee = 3;
    this.milkForm = 7;
    return { coffee: this.coffee, milkForm: this.milkForm };
  }
  get getMocha() {
    this.coffee = 4;
    this.chocolate = 2;
    this.steamedMilk = 2;
    this.whippedCream = 2;
    return {
      coffee: this.coffee,
      chocolate: this.chocolate,
      steamedMilk: this.steamedMilk,
      whippedCream: this.whippedCream,
    };
  }
  get getRistretto() {
    this.coffee = 2;
    return { coffee: this.coffee };
  }
}
export default CoffeeMaker;
