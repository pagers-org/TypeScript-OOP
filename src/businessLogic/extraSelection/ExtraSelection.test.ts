import { describe, expect, test } from '@jest/globals';
import { EXTRA_OPTIONS } from '@/constants';
import ExtraSelection from '@/businessLogic/extraSelection/ExtraSelection';

describe('extraSelection test', () => {
  describe('getSelected', () => {
    test('기본생성 하면 디포트값을 반환한다.', () => {
      const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
      expect(extraSelection.getSelected()).toEqual(EXTRA_OPTIONS[0].default);
    });
    test('타입이 같은 옵션으로 getSelected 값을 바꿀 수 있다.', () => {
      const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
      const selectable = EXTRA_OPTIONS[0].selectableList[0];
      const sameType = EXTRA_OPTIONS[0].type;

      extraSelection.select({ type: sameType, selected: selectable });
      expect(extraSelection.getSelected()).toEqual(selectable);
    });
  });
  describe('getType', () => {
    test('기본생성 하면 받은 타입을 반환한다.', () => {
      const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
      expect(extraSelection.getType()).toEqual(EXTRA_OPTIONS[0].type);
    });
  });
  describe('select', () => {
    test('타입이 다른 옵션으로 선택하면 에러가 발생한다.', () => {
      const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
      const selectable = EXTRA_OPTIONS[0].selectableList[0];
      const noSameAsMock = '다른 타입';
      expect(() => {
        extraSelection.select({ type: noSameAsMock, selected: selectable });
      }).toThrow();
    });
    test('선택가능하지 않은 다른 값으로 선택하면 에러가 발생한다.', () => {
      const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
      const notSelectable = '아무거나 선택됨';
      const sameType = EXTRA_OPTIONS[0].type;
      expect(() => {
        extraSelection.select({ type: sameType, selected: notSelectable });
      }).toThrow();
    });
  });
  describe('equal', () => {
    test('동일한 타입과 동일한 선택을 했으면 같다.', () => {
      const SAME_EXTRA_OPTION = EXTRA_OPTIONS[0];
      const a = new ExtraSelection(SAME_EXTRA_OPTION);
      const b = new ExtraSelection(SAME_EXTRA_OPTION);
      expect(a.equal(b)).toBeTruthy();
    });
    test('동일한 타입과 다른 선택을 했으면 false.', () => {
      const SAME_EXTRA_OPTION = EXTRA_OPTIONS[0];
      const a = new ExtraSelection(SAME_EXTRA_OPTION);
      const b = new ExtraSelection(SAME_EXTRA_OPTION);

      // 다른 선택으로 바꿈
      const diffSelect = SAME_EXTRA_OPTION.selectableList[1];
      expect(diffSelect).not.toEqual(b.getSelected());

      b.select({ selected: diffSelect, type: SAME_EXTRA_OPTION.type });
      expect(a.equal(b)).toBeFalsy();
    });
    test('다른 타입, 동일한 선택을 했으면 false.', () => {
      const SAME_EXTRA_OPTION = EXTRA_OPTIONS[0];
      const a = new ExtraSelection(SAME_EXTRA_OPTION);

      // 다른 선택으로 바꿈
      const diffType = '다른타입';
      expect(diffType).not.toEqual(a.getType());
      const b = new ExtraSelection({ ...SAME_EXTRA_OPTION, type: diffType });

      expect(a.equal(b)).toBeFalsy();
    });
  });
});
