import { MaterialName } from '@/@types';

export class Material {
  private id: number;
  private name: MaterialName;

  constructor(id: number, name: MaterialName) {
    this.id = id;
    this.name = name;
  }
}
