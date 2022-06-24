import OrderTitle from '@/components/OrderUI/OrderTitle';
import OrderButtonArea from '@/components/OrderUI/OrderButtonArea';
import OrderTable from '@/components/OrderUI/OrderTable';
import { EVENTS } from '@/constants';
import EventBus from '@/domains/core/EventBus';
import OrderDTO from '@/domains/order/OrderDTO';
import { Repository } from '@/domains/core/type';
import { createRandomOrderEntity } from '@/domains/order/orderService/createRandomOrderEntity';

const OrderUI = ({ $target, orderRepository }: { $target: Element | null; orderRepository: Repository<OrderDTO> }) => {
  if (!$target) {
    throw new Error('타겟 필요');
  }

  const createRandomOrder = () => {
    const newOrderDTO = new OrderDTO(createRandomOrderEntity());
    orderRepository.add(newOrderDTO);
    EventBus.emit(EVENTS.createOrder.completed, { item: newOrderDTO });
  };
  EventBus.on(EVENTS.createOrder.random, createRandomOrder);

  const deleteById = ({ id }: { id: string }) => {
    try {
      const item = orderRepository.findById(id);
      orderRepository.remove(item);
      EventBus.emit(EVENTS.deleteOrder.completed, { item });
    } catch (e) {
      alert(e);
    }
  };
  EventBus.on<{ id: string }>(EVENTS.deleteOrder.byId, deleteById);

  const editById = ({ id }: { id: string }) => {
    try {
      const item = orderRepository.findById(id);
      const newOrderDTO = new OrderDTO({ ...createRandomOrderEntity(item.orderNo), id: item.id });
      orderRepository.edit(newOrderDTO);
      EventBus.emit(EVENTS.editOrder.completed, { item: newOrderDTO });
    } catch (e) {
      alert(e);
    }
  };
  EventBus.on<{ id: string }>(EVENTS.editOrder.byId, editById);

  const clone = $target.cloneNode(false);
  clone.appendChild(OrderTitle());
  clone.appendChild(OrderButtonArea());
  clone.appendChild(OrderTable({ rows: orderRepository.getAll() }));
  $target.replaceWith(clone);
};

export default OrderUI;
