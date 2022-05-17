import { Serving } from '@/domain';

export class Servings {
  private readonly servingList: Serving[] = [];

  public add(serving: Serving) {
    this.servingList.push(serving);
  }
}
