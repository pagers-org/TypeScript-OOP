import { AbstractApi } from '@/api/AbstractApi';
import { Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';
import { BeverageName, MaterialName, OptionGroupName } from '@/@types';

export class FetchApi extends AbstractApi {
  protected async beverages(): Promise<Beverage[]> {
    const req = await fetch('/beverages.json');
    const res = (await req.json()) as any[];
    const result = res.map(item => new Beverage({ id: item.id, name: item.name as BeverageName }));

    return new Promise<Beverage[]>(resolve => resolve(result));
  }

  protected async materials(): Promise<Material[]> {
    const req = await fetch('/materials.json');
    const res = (await req.json()) as any[];
    const result = res.map(item => new Material({ id: item.id, name: item.name as MaterialName }));

    return new Promise<Material[]>(resolve => resolve(result));
  }

  protected async optionGroups(): Promise<OptionGroup[]> {
    const req = await fetch('/optionGroups.json');
    const res = (await req.json()) as any[];
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
    const req = await fetch('/options.json');
    const res = (await req.json()) as any[];
    const result = res.map(item => new Option({ id: item.id, optionGroupId: item.optionGroupId, name: item.name }));

    return new Promise<Option[]>(resolve => resolve(result));
  }

  protected async recipes(): Promise<Recipe[]> {
    const req = await fetch('/recipes.json');
    const res = (await req.json()) as any[];
    const result = res.map(
      item => new Recipe({ id: item.id, beverageId: item.beverageId, materialId: item.materialId, count: item.count }),
    );

    return new Promise<Recipe[]>(resolve => resolve(result));
  }
}
