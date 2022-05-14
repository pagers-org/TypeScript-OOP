interface OptionProps {
  name: string;
  selections: string[];
  type: 'radio' | 'checkbox';
  isOptional?: boolean;
  selectedIndex: number;
}

class Option implements OptionProps {
  name: string;
  selections: string[];
  type: 'radio' | 'checkbox';
  isOptional?: boolean;
  selectedIndex = 0;

  constructor({ name, selections, type, isOptional, selectedIndex }: OptionProps) {
    this.name = name;
    this.selections = selections;
    this.type = type;
    this.isOptional = isOptional || false;
    this.selectedIndex = selectedIndex || 0;
  }

  getOptions() {
    return this.selections;
  }

  getSelectedOption() {
    return this.selections[this.selectedIndex];
  }
}

export default Option;
