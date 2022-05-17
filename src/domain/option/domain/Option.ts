import { OptionName } from '@/@types';

export class Option {
  private readonly id: number;
  private readonly optionGroupId: number;
  private readonly name: OptionName;
  private selected = false;

  constructor(id: number, optionGroupId: number, name: OptionName) {
    this.id = id;
    this.optionGroupId = optionGroupId;
    this.name = name;
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
