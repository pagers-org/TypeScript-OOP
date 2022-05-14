import { describe, expect, test } from '@jest/globals';
import { EXTRA_OPTIONS } from '@/constants';
import ExtraSelection from '@/businessLogic/extraSelection/ExtraSelection';

describe('extraSelection test', () => {
  test('기본생성 하면 디포트값을 반환한다.', () => {
    const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
    expect(extraSelection.getSelected()).toEqual({ type: EXTRA_OPTIONS[0].type, selected: EXTRA_OPTIONS[0].default });
  });

  test('타입이 같은 옵션으로 getSelected 값을 바꿀 수 있다.', () => {
    const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
    const AnySelected = '아무거나 선택됨';
    extraSelection.select({ type: EXTRA_OPTIONS[0].type, selected: AnySelected });
    expect(extraSelection.getSelected()).toEqual({ type: EXTRA_OPTIONS[0].type, selected: AnySelected });
  });
  test('타입이 다른 옵션으로 선택하면 에러가 발생한다.', () => {
    const extraSelection = new ExtraSelection(EXTRA_OPTIONS[0]);
    const AnySelected = '아무거나 선택됨';
    const noSameAsMock = '다른 타입';
    expect(() => {
      extraSelection.select({ type: noSameAsMock, selected: AnySelected });
    }).toThrow();
  });
});
