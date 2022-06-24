import { describe, expect, test } from '@jest/globals';
import { InMemoryOptionalIngredientRepository } from '@/domains/optionalIngredient/optionalIngredientRepository/index';
import { OPTIONAL_INGREDIENTS } from '@/constants';
import { OptionalIngredientDTO } from '@/domains/optionalIngredient/optionalIngredientDTO';

const genExtraSelectionCollectionArg = () => {
  const record = new Map<string, OptionalIngredientDTO>();
  OPTIONAL_INGREDIENTS.forEach(option => record.set(option.type, new OptionalIngredientDTO(option)));
  return record;
};

describe('ExtraSelectionManager', () => {
  test('init', () => {
    expect(() => {
      new InMemoryOptionalIngredientRepository(genExtraSelectionCollectionArg());
    }).not.toThrow();
  });
  describe('select', () => {
    test('없는 타입을 선택하려하면 오류 반환', () => {
      const manager = new InMemoryOptionalIngredientRepository(genExtraSelectionCollectionArg());
      const existSelectable = OPTIONAL_INGREDIENTS[0].default;
      const noTypeExist = '없는_타입';
      expect(() => {
        manager.select({ type: noTypeExist, selected: existSelectable });
      }).toThrow();
    });
    test('잘동작함', () => {
      const manager = new InMemoryOptionalIngredientRepository(genExtraSelectionCollectionArg());
      expect(() => {
        manager.select({ type: OPTIONAL_INGREDIENTS[0].type, selected: OPTIONAL_INGREDIENTS[0].selectableList[1] });
      }).not.toThrow();
    });
  });

  describe('getSelectedAll', () => {
    // 체크할 것이 아직 없음
  });
});
