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
}

export default OptionGroup;
