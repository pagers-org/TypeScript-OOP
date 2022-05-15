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
});
