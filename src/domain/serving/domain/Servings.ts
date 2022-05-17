import { Serving } from '@/domain';

export class Servings {
  private readonly servingList: Serving[] = [];

  public add(serving: Serving) {
    this.servingList.push(serving);
  }

  public toElements(): HTMLElement[] {
    return this.servingList.map((item: Serving) => item.toElement());
  }
}
