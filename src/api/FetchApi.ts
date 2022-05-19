import { AbstractApi } from '@/api/AbstractApi';
import {
  Beverage,
  BeverageConstructor,
  Material,
  MaterialConstructor,
  Option,
  OptionConstructor,
  OptionGroup,
  OptionGroupConstructor,
  Recipe,
  RecipeConstructor,
} from '@/domain';
import { OptionGroupName } from '@/@types';

export type FetchApiConstructor = {
  host?: string;
};

const API_URL = {
  OPTIONS: '/options.json',
  BEVERAGES: '/beverages.json',
  MATERIALS: '/materials.json',
  OPTION_GROUPS: '/optionGroups.json',
  RECIPES: '/recipes.json',
} as const;

type ApiUrlValueType = typeof API_URL[keyof typeof API_URL];

export class FetchApi extends AbstractApi {
  private readonly host: string;

  constructor(constructor: FetchApiConstructor = {}) {
    super();

    this.host = constructor.host || '';
  }

  private async fetch<T>(url: ApiUrlValueType) {
    const req = await fetch(`${this.host}${url}`);
    return (await req.json()) as T[];
  }

  protected async beverages(): Promise<Beverage[]> {
    const res = await this.fetch<BeverageConstructor>(API_URL.BEVERAGES);
    const result = res.map(item => new Beverage({ id: item.id, name: item.name }));

    return new Promise<Beverage[]>(resolve => resolve(result));
  }

  protected async materials(): Promise<Material[]> {
    const res = await this.fetch<MaterialConstructor>(API_URL.MATERIALS);
    const result = res.map(item => new Material({ id: item.id, name: item.name }));

    return new Promise<Material[]>(resolve => resolve(result));
  }

  protected async optionGroups(): Promise<OptionGroup[]> {
    const res = await this.fetch<OptionGroupConstructor>(API_URL.OPTION_GROUPS);
    const optionsAll = await this.options();

    const result = res.map(item => {
      const options = optionsAll.filter(option => option.getGroupId() == item.id);

      return new OptionGroup({
        id: item.id,
        name: item.name as OptionGroupName,
        type: item.type,
        options,
      });
    });

    return new Promise<OptionGroup[]>(resolve => resolve(result));
  }

  protected async options(): Promise<Option[]> {
    const res = await this.fetch<OptionConstructor>(API_URL.OPTIONS);
    const result = res.map(item => new Option({ id: item.id, optionGroupId: item.optionGroupId, name: item.name }));

    return new Promise<Option[]>(resolve => resolve(result));
  }

  protected async recipes(): Promise<Recipe[]> {
    const res = await this.fetch<RecipeConstructor>(API_URL.RECIPES);
    const result = res.map(
      item => new Recipe({ id: item.id, beverageId: item.beverageId, materialId: item.materialId, count: item.count }),
    );

    return new Promise<Recipe[]>(resolve => resolve(result));
  }
}
