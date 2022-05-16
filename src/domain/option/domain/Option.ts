import { OptionName } from '@/@types';

export class Option {
  private id: number;
  private readonly optionGroupId: number;
  private readonly name: OptionName;
  private selected = false;

  constructor(id: number, optionGroupId: number, name: OptionName) {
    this.id = id;
    this.optionGroupId = optionGroupId;
    this.name = name;
  }

  public isSelected() {
    return this.selected;
  }

  public getName() {
    return this.name;
  }

  public setSelected(selected: boolean) {
    this.selected = selected;
  }

  public getGroupId() {
    return this.optionGroupId;
  }
}
