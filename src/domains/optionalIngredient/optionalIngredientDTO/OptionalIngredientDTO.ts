import { BaseId, OptionalIngredientEntity } from 'entity';
import { Equal, ExtraSelectable } from 'implementable';
import { deepCopyEntity } from '@/utils';

export default class OptionalIngredientDTO implements BaseId, ExtraSelectable, Equal<OptionalIngredientDTO> {
  private readonly _type: string;
  private readonly _optionalIngredientEntity: OptionalIngredientEntity;
  constructor(optionalIngredientEntity: OptionalIngredientEntity) {
    this._optionalIngredientEntity = deepCopyEntity(optionalIngredientEntity);
    this._type = this._optionalIngredientEntity.type;
  }

  get id() {
    return this._optionalIngredientEntity.id;
  }
  clone(): OptionalIngredientDTO {
    return new OptionalIngredientDTO(this._optionalIngredientEntity);
  }
  toEntity(): OptionalIngredientEntity {
    return this._optionalIngredientEntity;
  }
  toSerialize(): string {
    return JSON.stringify(this._optionalIngredientEntity);
  }
  equal(there: OptionalIngredientDTO) {
    return this.toSerialize() === there.toSerialize();
  }
  getSelected() {
    return this._optionalIngredientEntity.currentSelected;
  }
  getType() {
    return this._type;
  }

  getSelectableList() {
    return this._optionalIngredientEntity.selectableList;
  }
  select(option: string) {
    if (!this._optionalIngredientEntity.selectableList.includes(option)) {
      throw new Error('옵션에 선택할 수 있는 내용은 선택가능한 목록에 존재해야 합니다.');
    }
    this._optionalIngredientEntity.currentSelected = option;
  }
}
