declare module 'Coffee' {
  interface CoffeeOptions {
    id: string;
    menu: string;
    size: string;
    shot: string;
    syrup: string;
    iceOrHot: string;
    ice: string;
    whippedCream: string;
    extra: string;
    cup: string;
  }
  interface CoffeeMaterial {
    water?: number;
    coffee?: number;
    steamedMilk?: number;
    milkForm?: number;
    liquor?: number;
    chocolate?: number;
    whippedCream?: number;
    milk?: number;
  }
}
