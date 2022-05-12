import { Option } from '@/domain';

export class OptionGroup {
  public id: number;
  public name: string;
  public options: Option[];

  constructor(id: number, name: string, options: Option[] = []) {
    this.id = id;
    this.name = name;
    this.options = options;
  }

  public getSelectedOptions() {
    return this.options.filter(item => item.selected);
  }

  public getSelectedOptionValue(): string {
    return this.getSelectedOptions()
      .map(item => item.name)
      .join(',');
  }
}
