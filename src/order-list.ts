import coffee from '../mock/coffee.json';

type Coffee = {
  id: number;
  name: string;
  size: string;
  shots: number;
  syrup?: number;
  hasIce: boolean;
  iceType: string;
  whipping?: string;
  extra?: string;
  cupType: string;
};

interface CoffeeList {
  orderCoffee(): Coffee;
}

class OrderList implements CoffeeList {
  private id = 1;

  private getRandom(arr: string[] | number[] | boolean[]): number {
    const len = arr.length;
    return Math.trunc(Math.random() * len);
  }

  orderCoffee(): Coffee {
    const { name, size, shots, syrup, hasIce, iceType, whipping, extra, cupType } = coffee;

    return {
      id: this.id++,
      name: name[this.getRandom(name)],
      size: size[this.getRandom(size)],
      shots: shots[this.getRandom(shots)],
      syrup: syrup[this.getRandom(syrup)],
      hasIce: hasIce[this.getRandom(hasIce)],
      iceType: iceType[this.getRandom(iceType)],
      whipping: whipping[this.getRandom(whipping)],
      extra: extra[this.getRandom(extra)],
      cupType: cupType[this.getRandom(cupType)],
    };
  }
}

export default OrderList;
