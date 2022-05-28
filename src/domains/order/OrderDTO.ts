import { BaseId, OptionalIngredientEntity, OptionalIngredientType, OrderEntity, RequiredIngredientType } from 'entity';
import { deepCopyEntity } from '@/utils';

export default class OrderDTO implements BaseId {
  private readonly _orderEntity: OrderEntity;
  constructor(orderEntity: OrderEntity) {
    this._orderEntity = deepCopyEntity(orderEntity);
  }
  get id() {
    return this._orderEntity.id;
  }
  get orderNo() {
    return this._orderEntity.orderNo;
  }
  get menuTitle() {
    return this._orderEntity.menu.korean;
  }

  get size() {
    return this.getOptionalIngredientOrDash('size');
  }

  get shots() {
    // 수정해야할 부분!

    const menuShots = this.findRequiredIngredientOrNull('shots');
    const optionalShots = this.findOptionIngredientOrNull('shots');
    // shots view 라는 객체를 만들어야 할 것 같다.
    if (menuShots && optionalShots) {
      const optionalShotAmount = this.getOptionalShotAmount(optionalShots);
      return `${optionalShotAmount + menuShots.amount} shots`;
    }
    if (!menuShots && optionalShots) {
      return optionalShots.currentSelected;
    }
    if (menuShots && !optionalShots) {
      return `${menuShots.amount} shots`;
    }

    return '-';
  }

  get syrup() {
    return this.getOptionalIngredientOrDash('syrup');
  }

  get iceOrHot() {
    return this.getOptionalIngredientOrDash('ice/Hot');
  }
  get isIceSelectable() {
    return this.iceOrHot === 'ice';
  }

  get iceType() {
    if (!this.isIceSelectable) {
      return '선택할 수 없습니다.';
    }
    return this.getOptionalIngredientOrDash('ice-type');
  }

  get cupType() {
    return this.getOptionalIngredientOrDash('cup-type');
  }

  get whippedCream() {
    const menuWhippedCream = this.findRequiredIngredientOrNull('whippedCream');
    const optionalWhippedCream = this.findOptionIngredientOrNull('whipped-cream');
    if (menuWhippedCream && optionalWhippedCream) {
      return `메뉴기본: ${menuWhippedCream.amount} + 추가: ${optionalWhippedCream.currentSelected}`;
    }
    if (menuWhippedCream && !optionalWhippedCream) {
      return `${menuWhippedCream.amount} 만큼!`;
    }
    if (!menuWhippedCream && optionalWhippedCream) {
      return optionalWhippedCream.currentSelected;
    }
    return '-';
  }

  get extra() {
    // todo 하나 이상 선택 가능한 로직 추가해야함.
    return this.getOptionalIngredientOrDash('extra');
  }

  // 0 이상의 양수만 나올 수 있음
  // 오직 optinalIngredient에 type이 shots일때만 쓸 수 있는 함수.
  // 이런 친구들을 각 타입별로 추상화해서 쓰는게 맞는거같은데 일단은 order 클래스가 가지고 있게 하자!
  private getOptionalShotAmount = (optionalShots: OptionalIngredientEntity) => {
    const optionalShotsIndex = optionalShots.selectableList.findIndex(
      selectable => selectable === optionalShots.currentSelected,
    );

    return optionalShotsIndex === -1 ? 0 : optionalShotsIndex;
  };
  private findRequiredIngredientOrNull(requiredType: RequiredIngredientType) {
    return this._orderEntity.menu.requiredIngredients.find(ingredient => ingredient.type === requiredType) ?? null;
  }
  private findOptionIngredientOrNull(optionType: OptionalIngredientType) {
    return this._orderEntity.optionalIngredients.find(op => op.type === optionType) ?? null;
  }
  private getOptionalIngredientOrDash(optionType: OptionalIngredientType) {
    const item = this.findOptionIngredientOrNull(optionType);
    if (!item) {
      return '-';
    }
    return item.currentSelected;
  }
}
