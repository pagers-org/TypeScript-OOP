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

export type FetchApiConstructor = {
  host?: string;
  config?: RequestInit;
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
  private readonly host?: string = '';
  private readonly config?: RequestInit = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
  };

  constructor(constructor: FetchApiConstructor = { host: '' }) {
    super();

    this.host = constructor.host;
    this.config = Object.assign(this.config, constructor.config);
  }

  private async fetch<T>(url: ApiUrlValueType) {
    const req = await fetch(`${this.host}${url}`, this.config);

    return (await req.json()) as T[];
  }

  protected async beverages(): Promise<Beverage[]> {
    const res = await this.fetch<BeverageConstructor>(API_URL.BEVERAGES);
    const result = res.map(item => Beverage.fromObject(item));

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
      return OptionGroup.fromObject({ ...item, options });
    });

    return new Promise<OptionGroup[]>(resolve => resolve(result));
  }

  protected async options(): Promise<Option[]> {
    const res = await this.fetch<OptionConstructor>(API_URL.OPTIONS);
    const result = res.map(item => new Option(item));

    return new Promise<Option[]>(resolve => resolve(result));
  }

  protected async recipes(): Promise<Recipe[]> {
    const res = await this.fetch<RecipeConstructor>(API_URL.RECIPES);
    const result = res.map(item => Recipe.fromObject(item));

    return new Promise<Recipe[]>(resolve => resolve(result));
  }
}
