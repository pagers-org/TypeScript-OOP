import { Option } from '@/domain';

export type OptionGroupName = '사이즈' | '얼음 종류' | '샷' | '휘핑 크림' | '시럽' | '엑스트라' | 'ICE/HOT';

export class OptionGroup {
  public id: number;
  public name: OptionGroupName;
  public options: Option[];

  constructor(id: number, name: OptionGroupName, options: Option[] = []) {
    this.id = id;
    this.name = name;
    this.options = options;
  }

  private getSelectedOptions() {
    return this.options.filter(item => item.selected);
  }

  public getSelectedOptionValue(): string {
    return this.getSelectedOptions()
      .map(item => item.name)
      .join(',');
  }
}
