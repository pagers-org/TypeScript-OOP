import { OptionGroup } from '@/domain';

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

  public getOptionGroupByName(name: string): OptionGroup {
    return this.optionGroups.filter(group => group.name === name)[0];
  }

  public getSelectedOptionValue(groupName: string): string {
    return this.getOptionGroupByName(groupName).getSelectedOptionValue();
  }
}
