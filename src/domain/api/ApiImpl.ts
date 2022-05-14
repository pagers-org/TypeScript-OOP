import { Beverage, Material, Option, OptionGroup, Recipe, Api, OptionGroupName, BeverageName } from '@/domain';

export class ApiImpl implements Api {
  getBeverages(): Beverage[] {
    return [
      {
        id: 1,
        name: '아메리카노',
        price: 40,
      },
      {
        id: 2,
        name: '카페오레',
        price: 40,
      },
      {
        id: 3,
        name: '카푸치노',
        price: 40,
      },
      {
        id: 4,
        name: '코레또',
        price: 40,
      },
      {
        id: 5,
        name: '에스프레소',
        price: 40,
      },
      {
        id: 6,
        name: '카페 라떼',
        price: 40,
      },
      {
        id: 7,
        name: '룽고',
        price: 40,
      },
      {
        id: 8,
        name: '마끼야또',
        price: 40,
      },
      {
        id: 9,
        name: '카페 모카',
        price: 40,
      },
      {
        id: 10,
        name: '리스트레또',
        price: 40,
      },
    ].map(item => new Beverage(item.id, item.name as BeverageName, item.price));
  }

  getMaterials(): Material[] {
    return [
      {
        id: 1,
        name: '물',
        description: '물',
        price: 1,
      },
      {
        id: 2,
        name: '커피',
        description: '커피',
        price: 1,
      },
      {
        id: 3,
        name: '우유',
        description: '우유',
        price: 1,
      },
      {
        id: 4,
        name: '데운 우유',
        description: '데운 우유',
        price: 1,
      },
      {
        id: 5,
        name: '밀크 폼',
        description: '밀크 폼',
        price: 1,
      },
      {
        id: 6,
        name: '리퀴르',
        description: '리퀴르',
        price: 1,
      },
      {
        id: 7,
        name: '초콜릿',
        description: '초콜릿',
        price: 1,
      },
      {
        id: 8,
        name: '휘핑 크림',
        description: '휘핑 크림',
        price: 1,
      },
    ].map(item => new Material(item.id, item.name, item.description, item.price));
  }

  getOptionGroups(): OptionGroup[] {
    return [
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
      },
      {
        id: 7,
        name: 'ICE/HOT',
      },
      {
        id: 8,
        name: '컵',
      },
    ].map(item => {
      const optionGroup = new OptionGroup(item.id, item.name as OptionGroupName);
      optionGroup.options = this.getOptions().filter(option => option.optionGroupId == item.id);
      return optionGroup;
    });
  }

  getOptions(): Option[] {
    return [
      {
        id: 1,
        optionGroupId: 1,
        name: 'Tall',
        price: 1,
      },
      {
        id: 2,
        optionGroupId: 1,
        name: 'Grande',
        price: 1,
      },
      {
        id: 3,
        optionGroupId: 1,
        name: 'Venti',
        price: 1,
      },
      {
        id: 4,
        optionGroupId: 2,
        name: '기본 얼음',
        price: 1,
      },
      {
        id: 5,
        optionGroupId: 2,
        name: '각 얼음',
        price: 1,
      },
      {
        id: 6,
        optionGroupId: 3,
        name: '1샷',
        price: 1,
      },
      {
        id: 7,
        optionGroupId: 3,
        name: '2샷',
        price: 1,
      },
      {
        id: 8,
        optionGroupId: 3,
        name: '3샷',
        price: 1,
      },
      {
        id: 9,
        optionGroupId: 4,
        name: '없음',
        price: 1,
      },
      {
        id: 10,
        optionGroupId: 4,
        name: '적당히',
        price: 1,
      },
      {
        id: 11,
        optionGroupId: 4,
        name: '많이',
        price: 1,
      },
      {
        id: 12,
        optionGroupId: 5,
        name: '바닐라',
        price: 1,
      },
      {
        id: 13,
        optionGroupId: 5,
        name: '헤이즐넛',
        price: 1,
      },
      {
        id: 14,
        optionGroupId: 5,
        name: '카라멜',
        price: 1,
      },
      {
        id: 15,
        optionGroupId: 6,
        name: '자바칩',
        price: 1,
      },
      {
        id: 16,
        optionGroupId: 6,
        name: '카라멜 드리즐',
        price: 1,
      },
      {
        id: 17,
        optionGroupId: 6,
        name: '초코 드리즐',
        price: 1,
      },
      {
        id: 18,
        optionGroupId: 6,
        name: '아몬드',
        price: 1,
      },
      {
        id: 19,
        optionGroupId: 6,
        name: '시나몬',
        price: 1,
      },
      {
        id: 20,
        optionGroupId: 7,
        name: 'ICE',
        price: 1,
      },
      {
        id: 21,
        optionGroupId: 7,
        name: 'HOT',
        price: 1,
      },
      {
        id: 22,
        optionGroupId: 8,
        name: '1회용 컵',
        price: 1,
      },
      {
        id: 23,
        optionGroupId: 8,
        name: '텀블러',
        price: 1,
      },
      {
        id: 24,
        optionGroupId: 8,
        name: '머그컵',
        price: 1,
      },
      {
        id: 25,
        optionGroupId: 8,
        name: '재활용 컵',
        price: 1,
      },
    ].map(item => new Option(item.id, item.optionGroupId, item.name, item.price));
  }

  getRecipes(): Recipe[] {
    return [
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
    ].map(item => new Recipe(item.id, item.beverageId, item.materialId, item.count));
  }
}
