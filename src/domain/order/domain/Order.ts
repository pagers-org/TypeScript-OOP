import { OptionGroup } from '@/domain';
import { OptionGroupName, OptionName } from '@/@types';

export class Order {
  private readonly id: string;
  private readonly beverageId: number;
  private optionGroups: OptionGroup[] = [];
  private orderTime?: Date = new Date();
  private servingTime?: Date;

  constructor(id: string, beverage: number, optionGroups: OptionGroup[] = [], orderTime?: Date, servingTime?: Date) {
    this.id = id;
    this.beverageId = beverage;
    this.optionGroups = optionGroups;
    this.orderTime = orderTime;
    this.servingTime = servingTime;
  }

  private getOptionGroupByName(name: string): OptionGroup {
    const optionGroups = this.optionGroups.find(group => group.getName() === name);

    if (!optionGroups) {
      throw new Error();
    }

    return optionGroups;
  }

  public setSelectedOptionValue(groupName: OptionGroupName, value: string): void {
    this.getOptionGroupByName(groupName).setSelectedOptionValue(value);
  }

  public getSelectedOptionValue(groupName: OptionGroupName): string {
    return this.getOptionGroupByName(groupName).getSelectedOptionValue();
  }

  public isSelectedOptionEquals(groupName: OptionGroupName, target: OptionName): boolean {
    const group = this.getOptionGroupByName(groupName);

    if (group.getType() === 'multiple') {
      return group.getSelectedOptionValue().includes(target);
    } else {
      return this.getSelectedOptionValue(groupName) === target;
    }
  }

  public getBeverageId() {
    return this.beverageId;
  }

  public getId() {
    return this.id;
  }
}
