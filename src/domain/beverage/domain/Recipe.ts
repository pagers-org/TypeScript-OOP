export class Recipe {
  private id: number;
  private beverageId: number;
  private materialId: number;
  private count: number;

  constructor(id: number, beverageId: number, materialId: number, count: number) {
    this.id = id;
    this.beverageId = beverageId;
    this.materialId = materialId;
    this.count = count;
  }
}
