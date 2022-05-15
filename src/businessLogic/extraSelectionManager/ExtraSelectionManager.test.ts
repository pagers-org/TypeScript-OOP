import { describe, expect, test } from '@jest/globals';
import { ExtraSelectionManager } from '@/businessLogic/extraSelectionManager';
import { EXTRA_OPTIONS } from '@/constants';

describe('ExtraSelectionManager', () => {
  test('init', () => {
    expect(() => {
      new ExtraSelectionManager();
    }).not.toThrow();
  });
  describe('select', () => {
    test('없는 타입을 선택하려하면 오류 반환', () => {
      const manager = new ExtraSelectionManager();
      const existSelectable = EXTRA_OPTIONS[0].default;
      const noTypeExist = '없는_타입';
      expect(() => {
        manager.select({ type: noTypeExist, selected: existSelectable });
      }).toThrow();
    });
    test('잘동작함', () => {
      const manager = new ExtraSelectionManager();
      expect(() => {
        manager.select({ type: EXTRA_OPTIONS[0].type, selected: EXTRA_OPTIONS[0].selectableList[1] });
      }).not.toThrow();
    });
  });
  describe('equal', () => {
    test('같을 때', () => {
      const a = new ExtraSelectionManager();
      const b = new ExtraSelectionManager();
      expect(a.equal(b)).toBeTruthy();
    });
    test('다를 때', () => {
      const a = new ExtraSelectionManager();
      const b = new ExtraSelectionManager();
      const diff = EXTRA_OPTIONS[0];

      // 디폴트 값이랑 다르다는 점 미리 체크
      const diffSelectOnDefault = diff.selectableList[1];
      expect(diff.default).not.toEqual(diffSelectOnDefault);
      b.select({ type: diff.type, selected: diff.selectableList[1] });

      expect(a.equal(b)).toBeFalsy();
    });
  });
  describe('getSelectedAll', () => {
    // 체크할 것이 아직 없음
  });
});
