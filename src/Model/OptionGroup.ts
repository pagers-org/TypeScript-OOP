import Option from '@/Model/Option';

class OptionGroup {
  name: string;
  options: Option[];
  isMultiple: boolean;

  constructor(name: string, options: Option[], isMultiple: boolean) {
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

    targetOption.setIsSelected(!targetOption.getIsSelected());
  };

  selectOption = (optionIndex: number) => {
    if (this.isMultiple) {
      return this.selectMultipleOption(optionIndex);
    }

    this.selectSingleOption(optionIndex);
  };

  getSelectedOptions = () => {
    return this.options.filter(option => option.isSelected);
  };
}

export default OptionGroup;
