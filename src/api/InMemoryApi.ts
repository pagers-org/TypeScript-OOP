import { AbstractApi, Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';
import { BeverageName, MaterialName, OptionGroupName } from '@/@types';

const beverages = [
  {
    id: 1,
    name: '아메리카노',
  },
  {
    id: 2,
    name: '카페오레',
  },
  {
    id: 3,
    name: '카푸치노',
  },
  {
    id: 4,
    name: '코레또',
  },
  {
    id: 5,
    name: '에스프레소',
  },
  {
    id: 6,
    name: '카페 라떼',
  },
  {
    id: 7,
    name: '룽고',
  },
  {
    id: 8,
    name: '마끼야또',
  },
  {
    id: 9,
    name: '카페 모카',
  },
  {
    id: 10,
    name: '리스트레또',
  },
];
const materials = [
  {
    id: 1,
    name: '물',
  },
  {
    id: 2,
    name: '커피',
  },
  {
    id: 3,
    name: '우유',
  },
  {
    id: 4,
    name: '데운 우유',
  },
  {
    id: 5,
    name: '밀크 폼',
  },
  {
    id: 6,
    name: '리퀴르',
  },
  {
    id: 7,
    name: '초콜릿',
  },
  {
    id: 8,
    name: '휘핑 크림',
  },
];

const optionGroups = [
  {
    id: 1,
    name: '사이즈',
  },
  {
    id: 2,
    name: '얼음 종류',
  },
  {
    id: 3,
    name: '샷',
  },
  {
    id: 4,
    name: '휘핑 크림',
  },
  {
    id: 5,
    name: '시럽',
  },
  {
    id: 6,
    name: '엑스트라',
    type: 'multiple',
  },
  {
    id: 7,
    name: 'ICE/HOT',
  },
  {
    id: 8,
    name: '컵',
  },
];

const options = [
  {
    id: 1,
    optionGroupId: 1,
    name: 'Tall',
  },
  {
    id: 2,
    optionGroupId: 1,
    name: 'Grande',
  },
  {
    id: 3,
    optionGroupId: 1,
    name: 'Venti',
  },
  {
    id: 4,
    optionGroupId: 2,
    name: '기본 얼음',
  },
  {
    id: 5,
    optionGroupId: 2,
    name: '각 얼음',
  },
  {
    id: 6,
    optionGroupId: 3,
    name: '1샷',
  },
  {
    id: 7,
    optionGroupId: 3,
    name: '2샷',
  },
  {
    id: 8,
    optionGroupId: 3,
    name: '3샷',
  },
  {
    id: 9,
    optionGroupId: 4,
    name: '없음',
  },
  {
    id: 10,
    optionGroupId: 4,
    name: '적당히',
  },
  {
    id: 11,
    optionGroupId: 4,
    name: '많이',
  },
  {
    id: 12,
    optionGroupId: 5,
    name: '바닐라',
  },
  {
    id: 13,
    optionGroupId: 5,
    name: '헤이즐넛',
  },
  {
    id: 14,
    optionGroupId: 5,
    name: '카라멜',
  },
  {
    id: 15,
    optionGroupId: 6,
    name: '자바칩',
  },
  {
    id: 16,
    optionGroupId: 6,
    name: '카라멜 드리즐',
  },
  {
    id: 17,
    optionGroupId: 6,
    name: '초코 드리즐',
  },
  {
    id: 18,
    optionGroupId: 6,
    name: '아몬드',
  },
  {
    id: 19,
    optionGroupId: 6,
    name: '시나몬',
  },
  {
    id: 20,
    optionGroupId: 7,
    name: 'ICE',
  },
  {
    id: 21,
    optionGroupId: 7,
    name: 'HOT',
  },
  {
    id: 22,
    optionGroupId: 8,
    name: '1회용 컵',
  },
  {
    id: 23,
    optionGroupId: 8,
    name: '텀블러',
  },
  {
    id: 24,
    optionGroupId: 8,
    name: '머그컵',
  },
  {
    id: 25,
    optionGroupId: 8,
    name: '재활용 컵',
  },
];

const recipes = [
  { id: 1, beverageId: 1, materialId: 1, count: 6 },
  { id: 2, beverageId: 1, materialId: 2, count: 4 },

  { id: 3, beverageId: 2, materialId: 3, count: 5 },
  { id: 4, beverageId: 2, materialId: 2, count: 5 },

  { id: 5, beverageId: 3, materialId: 2, count: 3.5 },
  { id: 6, beverageId: 3, materialId: 4, count: 3 },
  { id: 7, beverageId: 3, materialId: 5, count: 3.5 },

  { id: 8, beverageId: 4, materialId: 2, count: 5.5 },
  { id: 9, beverageId: 4, materialId: 6, count: 2 },

  { id: 10, beverageId: 5, materialId: 2, count: 4 },

  { id: 10, beverageId: 6, materialId: 2, count: 4 },
  { id: 11, beverageId: 6, materialId: 4, count: 4 },
  { id: 12, beverageId: 6, materialId: 5, count: 2 },

  { id: 13, beverageId: 7, materialId: 2, count: 5 },
  { id: 14, beverageId: 7, materialId: 1, count: 5 },

  { id: 15, beverageId: 8, materialId: 2, count: 3 },
  { id: 16, beverageId: 8, materialId: 5, count: 7 },

  { id: 17, beverageId: 9, materialId: 2, count: 4 },
  { id: 18, beverageId: 9, materialId: 7, count: 2 },
  { id: 19, beverageId: 9, materialId: 4, count: 2 },
  { id: 20, beverageId: 9, materialId: 8, count: 2 },

  { id: 21, beverageId: 10, materialId: 2, count: 2 },
];

export class InMemoryApi extends AbstractApi {
  protected beverages(): Promise<Beverage[]> {
    const result = beverages.map(item => new Beverage({ id: item.id, name: item.name as BeverageName }));
    return new Promise<Beverage[]>(resolve => resolve(result));
  }

  protected materials(): Promise<Material[]> {
    const result = materials.map(item => new Material({ id: item.id, name: item.name as MaterialName }));

    return new Promise<Material[]>(resolve => resolve(result));
  }

  protected async optionGroups() {
    const optionsAll = await this.options();

    const result = optionGroups.map(item => {
      const options = optionsAll.filter(option => option.getGroupId() == item.id);

      //item.id, item.name as OptionGroupName, item.type, a
      return new OptionGroup({
        id: item.id,
        name: item.name as OptionGroupName,
        type: item.type,
        options,
      });
    });

    return new Promise<OptionGroup[]>(resolve => resolve(result));
  }

  public options(): Promise<Option[]> {
    const result = options.map(item => new Option({ id: item.id, optionGroupId: item.optionGroupId, name: item.name }));

    return new Promise<Option[]>(resolve => resolve(result));
  }

  public recipes(): Promise<Recipe[]> {
    const result = recipes.map(
      item => new Recipe({ id: item.id, beverageId: item.beverageId, materialId: item.materialId, count: item.count }),
    );
    return new Promise<Recipe[]>(resolve => resolve(result));
  }
}
