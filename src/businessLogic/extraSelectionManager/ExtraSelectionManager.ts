import { ExtraSelection } from '@/businessLogic/extraSelection';
import { EXTRA_OPTIONS } from '@/constants';
import { SelectedOption } from 'dto';

export default class ExtraSelectionManager {
  private readonly extraSelectionRecord: Map<string, ExtraSelection> = new Map<string, ExtraSelection>();
  constructor() {
    this.createRecord();
  }
  getSelectedAll() {
    return [...this.extraSelectionRecord.values()];
  }

  // 커피 주문받을 때, 커피 만들때 각각 컨트롤러가 생성되므로 서로 비교해야 valid 체크 가능
  equal(there: ExtraSelectionManager) {
    const a = this.getSelectedAll();
    const b = there.getSelectedAll();
    if (a.length !== b.length) {
      return false;
    }
    return a.every((selectable, index) => b[index].equal(selectable));
  }
  select(option: SelectedOption) {
    if (!this.extraSelectionRecord.has(option.type)) {
      throw new Error('매칭되는 타입이 없습니다.');
    }
    // optional chaining 필요 없지만, 타입스크립트가 has가 true여도 레코드에 있다는 것을 모름
    this.extraSelectionRecord.get(option.type)?.select(option);
  }
  private createRecord() {
    EXTRA_OPTIONS.map(extraIngredient =>
      this.extraSelectionRecord.set(extraIngredient.type, new ExtraSelection(extraIngredient)),
    );
  }
}
