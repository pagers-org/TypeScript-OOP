import { Api, Beverage } from '@/domain';
import { getRandomRange } from '@/common';

export class BeverageService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public getBeverages(): Beverage[] {
    return this.api.getBeverages();
  }

  public findRandom(): Beverage {
    return this.findById(getRandomRange(1, this.getBeverages().length));
  }

  public findById(id: number): Beverage {
    const beverage = this.getBeverages().find(beverage => beverage.getId() === id);

    if (!beverage) {
      throw new Error();
    }

    return beverage;
  }
}
