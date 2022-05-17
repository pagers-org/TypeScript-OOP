import { OptionGroup } from '@/domain';
import { OptionGroupName, OptionName } from '@/@types';

export class Order {
  private readonly id: string;
  private readonly beverageId: number;
  private readonly optionGroups: OptionGroup[] = [];
  private readonly orderTime: Date;

  constructor(id: string, beverage: number, optionGroups: OptionGroup[] = [], orderTime: Date = new Date()) {
    this.id = id;
    this.beverageId = beverage;
    this.optionGroups = optionGroups;
    this.orderTime = orderTime;
  }

  public validate() {
    this.optionGroups.forEach(optionGroup => {
      if (optionGroup.isEmptySelected()) {
        throw new Error(`${optionGroup.getName()} 옵션을 선택하세요`);
      }
    });
  }

  private getOptionGroupByName(name: string): OptionGroup {
    const optionGroups = this.optionGroups.find(group => group.getName() === name);

    if (!optionGroups) {
      throw new Error();
    }

    return optionGroups;
  }

  public setSelectedOptionValue(groupName: OptionGroupName, value: string): void {
    this.getOptionGroupByName(groupName).setSelected(value);
  }

  public getSelectedOptionValue(groupName: OptionGroupName): string {
    return this.getOptionGroupByName(groupName).getSelected();
  }

  public isSelectedOptionEquals(groupName: OptionGroupName, target: OptionName): boolean {
    const group = this.getOptionGroupByName(groupName);

    if (group.isMultiple()) {
      return group.getSelected().includes(target);
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

  public getOrderTime() {
    return this.orderTime;
  }
}
