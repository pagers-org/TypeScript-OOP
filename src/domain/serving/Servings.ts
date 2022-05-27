import { Serving } from '@/domain';

export type ServingsConstructor = {
  servings?: Serving[];
};

export class Servings {
  private readonly servings: Serving[];

  constructor(constructor: ServingsConstructor = {}) {
    this.servings = constructor.servings || [];
  }

  public add(serving: Serving) {
    this.servings.push(serving);
  }

  getAll() {
    return this.servings;
  }
}
