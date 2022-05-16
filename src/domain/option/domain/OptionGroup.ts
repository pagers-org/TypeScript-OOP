import { Option } from '@/domain';
import { OptionGroupName } from '@/@types';

export class OptionGroup {
  public id: number;
  public name: OptionGroupName;
  public options: Option[];
  public type?: string;

  constructor(id: number, name: OptionGroupName, type?: string, options: Option[] = []) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.type = type;
  }

  public getSelectedOptionValue(): string {
    return this.getSelectedOptions()
      .map(item => item.name)
      .join(',');
  }

  private getSelectedOptions(): Option[] {
    return this.options.filter(item => item.selected);
  }

  public setSelectedOptionValue(value: string): void {
    if (this.type === 'multiple') {
      this.setMultipleOptionValue(value);
    } else {
      this.setSingleOptionValue(value);
    }
  }

  private setSingleOptionValue(value: string): void {
    this.options.forEach(option => {
      option.selected = option.name == value;
    });
  }

  private setMultipleOptionValue(value: string): void {
    const option = this.options.find(option => option.name === value);

    if (!option) {
      throw new Error();
    }

    option.selected = !option.selected;
  }
}
