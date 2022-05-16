import { Option } from '@/domain';
import { OptionGroupName } from '@/@types';

export class OptionGroup {
  private id: number;
  private name: OptionGroupName;
  private options: Option[];
  private readonly type?: string;

  constructor(id: number, name: OptionGroupName, type?: string, options: Option[] = []) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.type = type;
  }

  public setOptions(options: Option[]) {
    this.options = options;
  }

  public getSelectedOptionValue(): string {
    return this.getSelectedOptions()
      .map(item => item.getName())
      .join(',');
  }

  private getSelectedOptions(): Option[] {
    return this.options.filter(item => item.isSelected());
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

  public getOptions() {
    return this.options;
  }

  public getType() {
    return this.type;
  }

  public getName() {
    return this.name;
  }
}
