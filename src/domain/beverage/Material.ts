import { MaterialName } from '@/@types';

export class Material {
  private readonly id: number;
  private readonly name: MaterialName;

  constructor(id: number, name: MaterialName) {
    this.id = id;
    this.name = name;
  }
}
