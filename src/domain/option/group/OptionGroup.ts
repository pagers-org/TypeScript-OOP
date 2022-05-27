import { Options } from '@/domain';
import { OptionGroupName } from '@/@types';

const TYPE_MULTIPLE = 'multiple';

export type OptionGroupConstructor = {
  id: number;
  name: OptionGroupName;
  type?: string;
  options?: Options;
};

export class OptionGroup {
  private readonly id: number;
  private readonly name: OptionGroupName;
  private readonly type?: string;
  private readonly options: Options;

  constructor(constructor: OptionGroupConstructor) {
    this.id = constructor.id;
    this.name = constructor.name;
    this.type = constructor.type;
    this.options = constructor.options || new Options();
  }

  public random() {
    const newOptionGroup = this.clone();
    newOptionGroup.resetSelected();
    newOptionGroup.randomSelected();
    return newOptionGroup;
  }

  public isMultiple(): boolean {
    return this.type === TYPE_MULTIPLE;
  }

  public isEmptySelected() {
    return this.options.isEmptySelected();
  }

  public resetSelected(): void {
    this.options.resetSelected();
  }

  public randomSelected(): void {
    this.options.randomSelected();
  }

  public setSelected(value: string): void {
    if (this.isMultiple()) {
      this.options.setMultipleOptionValue(value);
      return;
    }

    this.options.setSingleOptionValue(value);
  }

  public getSelected(): string {
    return this.options.getSelected();
  }

  public getName(): OptionGroupName {
    return this.name;
  }

  public clone() {
    return new OptionGroup({
      id: this.id,
      name: this.name,
      type: this.type,
      options: this.options,
    });
  }

  public static fromObject(item: any) {
    const { options } = item;
    return new OptionGroup({ ...item, options: new Options({ options }) });
  }
}
