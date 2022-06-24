import { OptionGroup } from '@/domain';
import { OptionGroupName, OptionName } from '@/@types';

export type OptionGroupsConstructor = {
  optionGroups: OptionGroup[];
};

export class OptionGroups {
  private readonly optionGroups: OptionGroup[] = [];

  constructor(constructor: OptionGroupsConstructor = { optionGroups: [] }) {
    this.optionGroups = constructor.optionGroups || [];
  }

  public validate() {
    this.optionGroups.forEach(optionGroup => {
      if (optionGroup.isEmptySelected()) {
        throw new Error(`${optionGroup.getName()} 옵션을 선택하세요`);
      }
    });
  }

  public find(name: string): OptionGroup {
    const optionGroups = this.optionGroups.find(group => group.getName() === name);

    if (!optionGroups) {
      throw new Error();
    }

    return optionGroups;
  }

  public setSelectedOptionValue(groupName: OptionGroupName, value: string): void {
    this.find(groupName).setSelected(value);
  }

  public getSelectedOptionValue(groupName: OptionGroupName): string {
    return this.find(groupName).getSelected();
  }

  public isSelectedOptionEquals(groupName: OptionGroupName, target: OptionName): boolean {
    const group = this.find(groupName);

    if (group.isMultiple()) {
      return group.getSelected().includes(target);
    } else {
      return this.getSelectedOptionValue(groupName) === target;
    }
  }
}
