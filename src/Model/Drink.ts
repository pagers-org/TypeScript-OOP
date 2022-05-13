import Option from '@/Model/Option';

// 마실 것만
class Drink {
  name: string;
  options: Option[];

  constructor({ name, options }: Drink) {
    this.name = name;
    this.options = options;
  }

  getName = () => {
    return this.name;
  };

  getOptions = () => {
    return this.options;
  };
}

export default Drink;
