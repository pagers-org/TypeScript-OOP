import { ExtraIngredientRecord, SelectedOption } from 'dto';
import { ExtraSelectable } from 'ObjectInterface';

export default class ExtraSelection implements ExtraSelectable {
  private selected: { type: string; selected: string };
  constructor(private readonly extraIngredientRecord: ExtraIngredientRecord) {
    this.selected = { type: this.extraIngredientRecord.type, selected: this.extraIngredientRecord.default };
  }

  getSelected() {
    return this.selected;
  }
  select(option: SelectedOption) {
    if (this.extraIngredientRecord.type !== option.type) {
      throw new Error('타입이 같아야 합니다.');
    }
    this.selected = option;
  }
}
