import { describe, expect, test } from '@jest/globals';
import { OPTIONAL_INGREDIENTS } from '@/constants';
import OptionalIngredientDTO from '@/domains/optionalIngredient/optionalIngredientDTO/OptionalIngredientDTO';

describe('optionalIngredientDTO test', () => {
  describe('getSelected', () => {
    test('기본생성 하면 디포트값을 반환한다.', () => {
      const extraSelection = new OptionalIngredientDTO(OPTIONAL_INGREDIENTS[0]);
      expect(extraSelection.getSelected()).toEqual(OPTIONAL_INGREDIENTS[0].default);
    });
    test('타입이 같은 옵션으로 getSelected 값을 바꿀 수 있다.', () => {
      const extraSelection = new OptionalIngredientDTO(OPTIONAL_INGREDIENTS[0]);
      const selectable = OPTIONAL_INGREDIENTS[0].selectableList[0];

      extraSelection.select(selectable);
      expect(extraSelection.getSelected()).toEqual(selectable);
    });
  });
  describe('getType', () => {
    test('기본생성 하면 받은 타입을 반환한다.', () => {
      const extraSelection = new OptionalIngredientDTO(OPTIONAL_INGREDIENTS[0]);
      expect(extraSelection.getType()).toEqual(OPTIONAL_INGREDIENTS[0].type);
    });
  });
  describe('select', () => {
    test('선택가능하지 않은 다른 값으로 선택하면 에러가 발생한다.', () => {
      const extraSelection = new OptionalIngredientDTO(OPTIONAL_INGREDIENTS[0]);
      const notSelectable = '아무거나 선택됨';
      expect(() => {
        extraSelection.select(notSelectable);
      }).toThrow();
    });
  });
  describe('equal', () => {
    test('동일한 타입과 동일한 선택을 했으면 같다.', () => {
      const SAME_EXTRA_OPTION = OPTIONAL_INGREDIENTS[0];
      const a = new OptionalIngredientDTO(SAME_EXTRA_OPTION);
      const b = new OptionalIngredientDTO(SAME_EXTRA_OPTION);
      expect(a.equal(b)).toBeTruthy();
    });
    test('동일한 타입과 다른 선택을 했으면 false.', () => {
      const SAME_EXTRA_OPTION = OPTIONAL_INGREDIENTS[0];
      const a = new OptionalIngredientDTO(SAME_EXTRA_OPTION);
      const b = new OptionalIngredientDTO(SAME_EXTRA_OPTION);

      // 다른 선택으로 바꿈
      const diffSelect = SAME_EXTRA_OPTION.selectableList[1];
      expect(diffSelect).not.toEqual(b.getSelected());

      b.select(diffSelect);
      expect(a.equal(b)).toBeFalsy();
    });
    test('다른 타입, 동일한 선택을 했으면 false.', () => {
      const SAME_EXTRA_OPTION = OPTIONAL_INGREDIENTS[0];
      const a = new OptionalIngredientDTO(SAME_EXTRA_OPTION);

      // 다른 선택으로 바꿈
      const diffType = 'whipped-cream';
      expect(diffType).not.toEqual(a.getType());
      const b = new OptionalIngredientDTO({ ...SAME_EXTRA_OPTION, type: diffType });

      expect(a.equal(b)).toBeFalsy();
    });
  });
});
