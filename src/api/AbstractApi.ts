import { Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';
import { BeverageName } from '@/@types';

export abstract class AbstractApi {
  protected abstract beverages(): Promise<Beverage[]>;

  protected abstract optionGroups(): Promise<OptionGroup[]>;

  protected abstract options(): Promise<Option[]>;

  protected abstract recipes(): Promise<Recipe[]>;

  protected abstract materials(): Promise<Material[]>;

  public async getOptionGroupsAll(): Promise<OptionGroup[]> {
    return await this.optionGroups();
  }

  public async getBeveragesAll(): Promise<Beverage[]> {
    return this.beverages();
  }

  public async getBeveragesCount(): Promise<number> {
    const beverages = await this.beverages();
    return beverages.length;
  }

  public async findBeverage(id: number): Promise<Beverage> {
    const beverages = await this.beverages();
    const beverage = beverages.find(beverage => beverage.getId() === id);

    if (!beverage) {
      throw new Error();
    }

    return beverage.clone();
  }

  public async findBeverageName(id: number): Promise<BeverageName> {
    const beverage = await this.findBeverage(id);

    return beverage.getName();
  }
}
