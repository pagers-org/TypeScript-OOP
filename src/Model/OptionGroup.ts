import Option from './Option';

class OptionGroup {
  name: string;
  isMultiple = false;
  options: Option[];

  constructor({ name, options, isMultiple }: OptionGroup) {
    this.name = name;
    this.options = options;
    this.isMultiple = isMultiple;
  }

  private selectSingleOption = (optionIndex: number) => {
    const newOption = this.options.map(option => {
      option.setIsSelected(false);
      return option;
    });
    newOption[optionIndex].setIsSelected(true);
    this.options = newOption;
  };

  private selectMultipleOption = (optionIndex: number) => {
    const targetOption = this.options[optionIndex];

    if (targetOption.getIsSelected()) {
      return targetOption.setIsSelected(false);
    }
    targetOption.setIsSelected(true);
  };

  selectOption = (optionIndex: number) => {
    if (this.isMultiple) {
      return this.selectMultipleOption(optionIndex);
    }

    this.selectSingleOption(optionIndex);
  };
}

export default OptionGroup;
