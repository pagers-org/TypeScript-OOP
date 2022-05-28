import { BaseId } from 'entity';
import { Repository } from '@/domains/core/type';

// colection 안에는 최소한의 의존성을 지니게 하고 싶은데...
// 일부 컬랙션은 equal이라는 메서드가 필요 없을 것 같은데
// 그렇다면 equal은 어떻게 관리해야할까요...?

export default abstract class InMemoryRepository<IdAcceptable extends BaseId> implements Repository<IdAcceptable> {
  constructor(protected readonly _record: Map<string, IdAcceptable>) {}

  findById(id: string) {
    const item = this.getByIdOrNull(id);
    if (!item) {
      throw new Error(`no item id:${id}`);
    }
    return item;
  }

  getByIdOrNull(id: string): IdAcceptable | null {
    return this._record.get(id) ?? null;
  }
  add(item: IdAcceptable) {
    this._record.set(item.id, item);
  }
  remove(item: IdAcceptable) {
    if (!this.getByIdOrNull(item.id)) {
      return;
    }

    this._record.delete(item.id);
  }

  edit(item: IdAcceptable) {
    this._record.set(item.id, item);
  }
  getAll() {
    return [...this._record.values()];
  }
}
