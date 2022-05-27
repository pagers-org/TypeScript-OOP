import { Options } from '@/domain';

export type RecipeConstructor = {
  id: number;
  beverageId: number;
  materialId: number;
  count: number;
};

export class Recipe {
  private readonly id: number;
  private readonly beverageId: number;
  private readonly materialId: number;
  private readonly count: number;

  constructor(constructor: RecipeConstructor) {
    this.id = constructor.id;
    this.beverageId = constructor.beverageId;
    this.materialId = constructor.materialId;
    this.count = constructor.count;
  }

  public static fromObject(item: any) {
    return new Recipe({ id: item.id, beverageId: item.beverageId, materialId: item.materialId, count: item.count });
  }
}
