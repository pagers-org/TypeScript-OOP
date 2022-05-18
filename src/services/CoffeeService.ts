import Coffee, { COFFE_NAMES } from '../model/Coffee';
import Option, { OptionKey, OPTIONS } from '../model/Option';
import { entries, keys, pickRandom } from '../utils';

class CoffeeService {
  private menus: Coffee[];
  private options: Record<OptionKey, Option[]>;

  constructor() {
    this.menus = entries(COFFE_NAMES).map(([id, name]) => new Coffee(id, name));
    this.options = entries(OPTIONS)
      .flatMap(([key, options]) => options.map(option => ({ key, option })))
      .reduce((acc, { key, option }) => {
        acc[key] = acc[key] || [];
        acc[key].push(new Option(key, option));
        return acc;
      }, {} as Record<OptionKey, Option[]>);
  }

  getRandomCoffee() {
    return pickRandom(this.menus);
  }

  getRandomOptions(): Option[] {
    return keys(OPTIONS).map(key => pickRandom(this.options[key]));
  }
}

export default new CoffeeService();
