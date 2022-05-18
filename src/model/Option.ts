class Option {
  private id: number;
  private key: OptionKey;
  private value: OptionValue;
  private static uniqueIdCnt = 0;

  constructor(key: OptionKey, value: OptionValue) {
    this.id = this.getUniqueId();
    this.key = key;
    this.value = value;
  }

  private getUniqueId() {
    return (Option.uniqueIdCnt += 1);
  }

  private titles: Record<OptionKey, string> = {
    size: '사이즈',
    shot: '샷',
    syrup: '시럽',
    hotOrIce: 'ICE/HOT',
    whippedCream: '휘핑 크림',
    extra: '엑스트라',
    cup: '컵',
    iceType: '얼음 종류',
  };

  public getTitle() {
    return this.titles[this.key];
  }

  public getValue() {
    return this.value;
  }

  public getKey() {
    return this.key;
  }

  public setValue(value: string) {
    if (!OPTIONS[this.key].includes(value)) {
      alert(`${value}은(는) 유효한 옵션이 아니예요.\n👉${OPTIONS[this.key].join('\n👉')}\n중에서 선택 해주세요 😇`);
      return;
    }
    this.value = value;
  }
}

export const OPTIONS = {
  size: ['Tall', 'Grande', 'Venti'],
  shot: ['1', '2', '3'],
  syrup: ['바닐라', '헤이즐넛', '카라멜'],
  hotOrIce: ['ICE', 'HOT'],
  iceType: ['기본얼음', '각얼음', '-'],
  whippedCream: ['없음', '적당히', '많이'],
  extra: ['자바칩', '카라멜드리즐', '초코드리즐', '아몬드', '시나몬', '-'],
  cup: ['1회용 컵', '텀블러', '머그컵', '재활용 컵'],
};

export type Options = typeof OPTIONS;
export type OptionKey = keyof Options;
export type OptionValue = Options[OptionKey][number];

export default Option;
