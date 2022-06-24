class Option {
  name: string;
  isSelected: boolean;

  constructor(name: string, isSelected?: boolean) {
    this.name = name;
    this.isSelected = isSelected || false;
  }

  setIsSelected = (isSelected: boolean) => {
    this.isSelected = isSelected;
  };

  getIsSelected = () => {
    return this.isSelected;
  };
}

export default Option;
