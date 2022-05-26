import { Option } from '@/domain';
import { getRandomRange } from '@/common';

export type OptionsConstructor = {
  options?: Option[];
};

export class Options {
  private readonly options: Option[];

  constructor(constructor: OptionsConstructor = {}) {
    this.options = constructor.options || [];
  }

  public setSingleOptionValue(value: string): void {
    this.options.forEach(option => {
      option.setSelected(option.getName() == value);
    });
  }

  public setMultipleOptionValue(value: string): void {
    const option = this.options.find(option => option.getName() === value);

    if (!option) {
      throw new Error();
    }

    option.setSelected(!option.isSelected());
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

  public getSelected(): string {
    return this.getSelectedOptions()
      .map(item => item.getName())
      .join(',');
  }

  private getSelectedOptions(): Option[] {
    return this.options.filter(item => item.isSelected());
  }

  public clone() {
    return new Options({
      options: this.options,
    });
  }
}
