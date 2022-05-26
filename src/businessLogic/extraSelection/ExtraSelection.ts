import { BaseId, ExtraIngredientRecord, SelectedOption } from 'dto';
import { Comparable, ExtraSelectable } from 'ObjectInterface';

export default class ExtraSelection implements BaseId, ExtraSelectable, Comparable<ExtraSelection> {
  private readonly _type: string;
  constructor(private readonly extraIngredientRecord: ExtraIngredientRecord) {
    this._type = this.extraIngredientRecord.type;
  }

  get id() {
    return this.extraIngredientRecord.id;
  }
  clone(): ExtraSelection {
    return new ExtraSelection(this.extraIngredientRecord);
  }
  toSerialize(): ExtraIngredientRecord {
    return this.extraIngredientRecord;
  }
  equal(there: ExtraSelection) {
    return this.getType() === there.getType() && this.getSelected() === there.getSelected();
  }
  getSelected() {
    return this.extraIngredientRecord.currentSelected;
  }
  getType() {
    return this._type;
  }

  getSelectableList() {
    return this.extraIngredientRecord.selectableList;
  }
  select(option: SelectedOption) {
    if (this._type !== option.type) {
      throw new Error('타입이 같아야 합니다.');
    }
    if (!this.extraIngredientRecord.selectableList.includes(option.selected)) {
      throw new Error('옵션에 선택할 수 있는 내용은 선택가능한 목록에 존재해야 합니다.');
    }
    this.extraIngredientRecord.currentSelected = option.selected;
  }
}
