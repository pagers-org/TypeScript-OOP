import OrderTitle from '@/components/OrderUI/OrderTitle';
import OrderButtonArea from '@/components/OrderUI/OrderButtonArea';
import OrderTable from '@/components/OrderUI/OrderTable';
import { ExtraSelectionCollection } from '@/businessLogic/extraSelectionCollection';
import { ExtraSelection } from '@/businessLogic/extraSelection';
import { EVENTS, EXTRA_OPTIONS } from '@/constants';
import EventBus from '@/businessLogic/core/EventBus';

// 임시 생성자
const genExtraSelectionCollectionArg = () => {
  const record = new Map<string, ExtraSelection>();
  EXTRA_OPTIONS.forEach(option => record.set(option.type, new ExtraSelection(option)));
  return record;
};

const OrderUI = ({ $target }: { $target: Element | null }) => {
  if (!$target) {
    throw new Error('타겟 필요');
  }
  const selectionCollection = new ExtraSelectionCollection(genExtraSelectionCollectionArg());

  const createRandomOrder = () => {
    const newItem = new ExtraSelection(EXTRA_OPTIONS[Math.floor(EXTRA_OPTIONS.length * Math.random())]);
    selectionCollection.add(newItem);
    EventBus.emit(EVENTS.createOrder.completed, { item: newItem });

    // // 실험 1 custom event 로 관리하기
    // dispatchEvent(new CustomEvent(EVENTS.createOrder, { detail: newItem }));
  };
  EventBus.on(EVENTS.createOrder.random, createRandomOrder);

  // 실험 2 custom event bus 로 관리하기
  const deleteById = ({ id }: { id: string }) => {
    try {
      const item = selectionCollection.getById(id);
      selectionCollection.remove(item);
    } catch (e) {
      alert(e);
    }
  };
  EventBus.on<{ id: string }>(EVENTS.deleteOrder.byId, deleteById);

  const editById = ({ id }: { id: string }) => {
    try {
      const item = selectionCollection.getById(id).clone();

      const selectableList = item.getSelectableList();
      const randomSelected = selectableList[Math.floor(Math.random() * selectableList.length)];
      item.select({ type: item.getType(), selected: randomSelected });

      selectionCollection.edit(item);
      EventBus.emit(EVENTS.editOrder.completed, { item });
    } catch (e) {
      alert(e);
    }
  };
  EventBus.on<{ id: string }>(EVENTS.editOrder.byId, editById);

  const clone = $target.cloneNode(false);
  clone.appendChild(OrderTitle());
  clone.appendChild(OrderButtonArea());
  clone.appendChild(OrderTable({ rows: selectionCollection.getSelectedAll() }));
  $target.replaceWith(clone);
};

export default OrderUI;
