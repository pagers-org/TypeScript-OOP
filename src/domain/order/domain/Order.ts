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

  private getOptionGroupByName(name: string): OptionGroup {
    const optionGroups = this.optionGroups.find(group => group.name === name);

    if (!optionGroups) {
      throw new Error();
    }

    return optionGroups;
  }

  public getSelectedOptionValue(groupName: string): string {
    return this.getOptionGroupByName(groupName).getSelectedOptionValue();
  }
}
