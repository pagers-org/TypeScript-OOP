import { MaterialName } from '@/@types';

export type MaterialConstructor = {
  id: number;
  name: MaterialName;
};

export class Material {
  private readonly id: number;
  private readonly name: MaterialName;

  constructor(constructor: MaterialConstructor) {
    this.id = constructor.id;
    this.name = constructor.name;
  }
}
