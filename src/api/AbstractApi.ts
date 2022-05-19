import { Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';

export abstract class AbstractApi {
  protected abstract beverages(): Promise<Beverage[]>;

  protected abstract optionGroups(): Promise<OptionGroup[]>;

  protected abstract options(): Promise<Option[]>;

  protected abstract recipes(): Promise<Recipe[]>;

  protected abstract materials(): Promise<Material[]>;

  public async getOptionGroupsAll() {
    return await this.optionGroups();
  }

  public getBeveragesAll() {
    return this.beverages();
  }

  public async getBeveragesCount() {
    const beverages = await this.beverages();
    return beverages.length;
  }

  public async findBeverage(id: number) {
    const beverages = await this.beverages();
    const beverage = beverages.find(beverage => beverage.getId() === id);

    if (!beverage) {
      throw new Error();
    }

    return beverage.clone();
  }

  public async findBeverageName(id: number) {
    const beverage = await this.findBeverage(id);

    return beverage.getName();
  }
}
