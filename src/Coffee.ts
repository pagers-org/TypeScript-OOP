const coffeeNames = ['아메리카노', '카페 오레', '카푸치노', '코레또', '에스프레소', '카페 라떼', '룽고', '마끼야또', '카페 모카', '리스트레또'] as const;
const coffeeSize = ['Tall', 'Grande', 'Venti'] as const;
const coffeeShot = [1, 2, 3] as const;
const coffeeSyrup = ['Vanilla', 'Hazelnut', 'Caramel'] as const;
const iceOrHot = ['Ice', 'Hot'] as const;
const iceType = ['Basic', 'Cube'] as const;
const whippedCream = ['None', 'Fit', 'Many'] as const;
const extraOption = ['javaChip', 'caramelDrizzle', 'chocolateDrizzle', 'almond', 'cinnamon'] as const;
const cupType = ['Disposable', 'Tumbler', 'Mug', 'Recycling'] as const;

interface CoffeeMenuType {
  name: typeof coffeeNames[number];
  size: typeof coffeeSize[number];
  shot?: typeof coffeeShot[number];
  syrup?: typeof coffeeSyrup[number];
  iceOrHot: typeof iceOrHot[number];
  ice?: typeof iceType[number];
  whippedCream: typeof whippedCream[number];
  extra?: typeof extraOption[number];
  cup: typeof cupType[number];
}
type ValueOf<T> = T[keyof T];

export class Coffee {
  constructor() {

  }

  getRandom<T extends readonly (string | number)[]>(values: T): T[number] {
    return values[Math.floor(Math.random() * values.length)];
  }

  get randomMenu(): CoffeeMenuType {
    return {
      name: this.getRandom(coffeeNames),
      size: this.getRandom(coffeeSize),
      shot: this.getRandom(coffeeShot),
      syrup: this.getRandom(coffeeSyrup),
      iceOrHot: this.getRandom(iceOrHot),
      ice: this.getRandom(iceType),
      whippedCream: this.getRandom(whippedCream),
      extra: this.getRandom(extraOption),
      cup: this.getRandom(cupType),
    }
  }
}
