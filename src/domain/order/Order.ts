import { Beverage, OptionGroup } from '@/domain';
import { OptionGroupName, OptionName } from '@/@types';
import { nanoid } from 'nanoid';

export type OrderConstructor = {
  id: string;
  beverage: Beverage;
  optionGroups?: OptionGroup[];
  orderTime?: Date;
};

export class Order {
  private readonly id: string;
  private readonly beverage: Beverage;
  private readonly optionGroups: OptionGroup[] = [];
  private readonly orderTime: Date;

  constructor(constructor: OrderConstructor) {
    this.id = constructor.id;
    this.beverage = constructor.beverage;
    this.optionGroups = constructor.optionGroups || [];
    this.orderTime = constructor.orderTime || new Date();
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
    return this.beverage.getId();
  }

  public getBeverageName() {
    return this.beverage.getName();
  }

  public getId() {
    return this.id;
  }

  public getOrderTime() {
    return this.orderTime;
  }

  public clone() {
    return new Order({
      id: this.id,
      beverage: this.beverage,
      orderTime: this.orderTime,
      optionGroups: this.optionGroups,
    });
  }
}
