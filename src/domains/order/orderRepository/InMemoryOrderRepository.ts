import OrderDTO from '@/domains/order/OrderDTO';
import InMemoryRepository from '@/domains/core/InMemoryRepository';
import { GetByName } from '@/domains/core/type';

export default class InMemoryOrderRepository extends InMemoryRepository<OrderDTO> implements GetByName<OrderDTO> {
  getByName(name: string) {
    return this.getAll().find(order => order.menuTitle === name) ?? null;
  }
}
