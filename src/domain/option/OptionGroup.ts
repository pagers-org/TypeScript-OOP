import { Option } from '@/domain';
import { OptionGroupName } from '@/@types';
import { getRandomRange } from '@/common';

const TYPE_MULTIPLE = 'multiple';

export class OptionGroup {
  private readonly id: number;
  private readonly name: OptionGroupName;
  private readonly type?: string;
  private readonly options: Option[];

  constructor(id: number, name: OptionGroupName, type?: string, options: Option[] = []) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.type = type;
  }

  public isMultiple(): boolean {
    return this.type === TYPE_MULTIPLE;
  }

  public isEmptySelected() {
    return this.options.filter(option => option.isSelected()).length === 0;
  }

  public resetSelected(): void {
    this.options.forEach(option => option.setSelected(false));
  }

  public randomSelected(): void {
    const idx = getRandomRange(0, this.options.length - 1);
    this.options[idx].setSelected(true);
  }

  public setSelected(value: string): void {
    if (this.isMultiple()) {
      this.setMultipleOptionValue(value);
      return;
    }

    this.setSingleOptionValue(value);
  }

  public getSelected(): string {
    return this.getSelectedOptions()
      .map(item => item.getName())
      .join(',');
  }

  private getSelectedOptions(): Option[] {
    return this.options.filter(item => item.isSelected());
  }

  private setSingleOptionValue(value: string): void {
    this.options.forEach(option => {
      option.setSelected(option.getName() == value);
    });
  }

  private setMultipleOptionValue(value: string): void {
    const option = this.options.find(option => option.getName() === value);

    if (!option) {
      throw new Error();
    }

    option.setSelected(!option.isSelected());
  }

  public getName(): OptionGroupName {
    return this.name;
  }

  public clone() {
    return new OptionGroup(
      this.id,
      this.name,
      this.type,
      this.options.map(option => option.clone()),
    );
  }
}
