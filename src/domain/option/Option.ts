import { OptionName } from '@/@types';

export type OptionConstructor = {
  id: number;
  optionGroupId: number;
  name: OptionName;
  selected: boolean;
};

export class Option {
  private readonly id: number;
  private readonly optionGroupId: number;
  private readonly name: OptionName;
  private selected = false;

  constructor(constructor: OptionConstructor) {
    this.id = constructor.id;
    this.optionGroupId = constructor.optionGroupId;
    this.name = constructor.name;
    this.selected = constructor.selected || false;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public getName(): OptionName {
    return this.name;
  }

  public setSelected(selected: boolean): void {
    this.selected = selected;
  }

  public getGroupId(): number {
    return this.optionGroupId;
  }
}
