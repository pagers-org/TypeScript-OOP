class Option {
  // 옵션 이름
  name: string;
  // 사용 가능한 옵션
  selections: string[];
  // 옵션 타입 (다중 선택, 하나 선택)
  type: 'radio' | 'checkbox';
  // 필수로 넣어야하는 옵션인가요?
  isOptional: boolean;
  // options 중에 선택된 것.
  selectedIndex = 0;

  constructor({ name, selections, type, isOptional }: Option) {
    this.name = name;
    this.selections = selections;
    this.type = type;
    this.isOptional = isOptional;
  }

  getOptions() {
    return this.selections;
  }

  getSelectedOption() {
    return this.selections[this.selectedIndex];
  }
}

export default Option;
