class Option {
  name: string;
  isSelected: boolean;

  constructor({ name, isSelected }: Option) {
    this.name = name;
    this.isSelected = isSelected;
  }
}

export default Option;
