import { OptionGroup } from '@/domain';
import { OptionGroupName, OptionName } from '@/@types';

export class Order {
  public id: string;
  public beverageId: number;
  public optionGroups: OptionGroup[] = [];
  public orderTime?: Date = new Date();
  public servingTime?: Date;

  constructor(id: string, beverage: number, optionGroups: OptionGroup[] = [], orderTime?: Date, servingTime?: Date) {
    this.id = id;
    this.beverageId = beverage;
    this.optionGroups = optionGroups;
    this.orderTime = orderTime;
    this.servingTime = servingTime;
  }

  private getOptionGroupByName(name: string): OptionGroup {
    const optionGroups = this.optionGroups.find(group => group.name === name);

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

    if (group.type === 'multiple') {
      return group.getSelectedOptionValue().includes(target);
    } else {
      return this.getSelectedOptionValue(groupName) === target;
    }
  }
}
