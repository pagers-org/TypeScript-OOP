export class Recipe {
  private readonly id: number;
  private readonly beverageId: number;
  private readonly materialId: number;
  private readonly count: number;

  constructor(id: number, beverageId: number, materialId: number, count: number) {
    this.id = id;
    this.beverageId = beverageId;
    this.materialId = materialId;
    this.count = count;
  }
}
