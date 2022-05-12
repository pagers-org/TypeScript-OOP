export class Recipe {
  public id: number;
  public beverageId: number;
  public materialId: number;
  public count: number;

  constructor(id: number, beverageId: number, materialId: number, count: number) {
    this.id = id;
    this.beverageId = beverageId;
    this.materialId = materialId;
    this.count = count;
  }
}
