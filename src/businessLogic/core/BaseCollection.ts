import { BaseId } from 'dto';
import { Comparable } from 'ObjectInterface';

// colection 안에는 최소한의 의존성을 지니게 하고 싶은데...
// 일부 컬랙션은 equal이라는 메서드가 필요 없을 것 같은데
// 그렇다면 equal은 어떻게 관리해야할까요...?
export default abstract class BaseCollection<
  IdAcceptableAndComparable extends BaseId & Comparable<IdAcceptableAndComparable>,
> {
  constructor(protected readonly _record: Map<string, IdAcceptableAndComparable>) {}

  /**
   * 내부 컬랙션에 존재한다고 확신한 아이템을 가져올 때 사용
   * */
  getById(id: string) {
    const item = this._findById(id);
    if (!item) {
      throw new Error(`no item id:${id}`);
    }
    return item;
  }
  /**
   * 내부에 존재 하나 안하나 모를 때 사용
   * */
  protected _findById(id: string): IdAcceptableAndComparable | undefined {
    return this._record.get(id);
  }
  add(item: IdAcceptableAndComparable) {
    const oldItem = this._findById(item.id);

    if (oldItem && oldItem.equal(item)) {
      return;
    }
    this._record.set(item.id, item);
  }
  remove(item: IdAcceptableAndComparable) {
    if (!this._findById(item.id)) {
      return;
    }

    this._record.delete(item.id);
  }

  edit(item: IdAcceptableAndComparable) {
    const oldItem = this._findById(item.id);
    if (oldItem?.equal(item)) {
      return;
    }
    this._record.set(item.id, item);
  }
}
