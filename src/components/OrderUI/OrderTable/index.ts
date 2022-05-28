import { castEventTargetToElement, createDom } from '@/utils';
import { ExtraSelection } from '@/businessLogic/extraSelection';
import EventBus from '@/businessLogic/core/EventBus';
import { EVENTS } from '@/constants';
import TableHead from '@/components/OrderUI/OrderTable/TableHead';
import TableRows from '@/components/OrderUI/OrderTable/TableRows';
import TableRow from '@/components/OrderUI/OrderTable/TableRow';

/**
 * @todo: 각 헬퍼함수 추상화... 혹은 ui 공통로직으로 캡슐화
 * */
const OrderTable = ({ rows }: { rows: ExtraSelection[] }) => {
  // 아 리액트나 웹컴포넌트처럼 컴포지션하고싶은데 이게 쉽지 않네요...
  const template = `
  <div class="wrapper">
      <div class="table" id="order-table">
          <template data-component="table-header"></template>
          <template data-component="table-rows"></template>
      </div>
  </div>
`;
  const $orderTable = createDom(template);

  // 컴포지션을 위한 처리...
  $orderTable.querySelector('[data-component="table-header"]')?.replaceWith(TableHead());
  $orderTable.querySelector('[data-component="table-rows"]')?.replaceWith(TableRows({ rows }));

  // 삭제를 위한 이벤트와 리스너 묶음
  const onDeleteClick = (e: Event) => {
    const target = castEventTargetToElement(e.target);
    if (!target.closest('.remove-order')) {
      return;
    }
    const $item = target.closest(`[data-order-id]`) as HTMLElement;
    if (!$item) {
      return;
    }
    const itemId = $item.dataset.orderId;
    if (itemId === null || itemId === undefined) {
      return;
    }
    EventBus.emit('deleteById', { id: itemId });
    $item.remove();
  };
  $orderTable.addEventListener('click', onDeleteClick);
  // 삭제를 위한 이벤트와 리스너 묶음

  // 수정을 위한 이벤트와 리스너 묶음
  const onEditClick = (e: Event) => {
    const target = castEventTargetToElement(e.target);
    if (!target.closest('.edit-order')) {
      return;
    }
    const $item = target.closest(`[data-order-id]`) as HTMLElement;
    if (!$item) {
      return;
    }
    const itemId = $item.dataset.orderId;
    if (itemId === null || itemId === undefined) {
      return;
    }
    EventBus.emit<{ id: string }>(EVENTS.editOrder.byId, { id: itemId });
  };
  $orderTable.addEventListener('click', onEditClick);

  EventBus.on<{ item: ExtraSelection }>(EVENTS.editOrder.completed, ({ item }) => {
    const $newElement = TableRow({ item });
    const $oldElement = $orderTable.querySelector(`[data-order-id="${item.id}"]`);
    if (!$oldElement) {
      return;
    }

    $oldElement.replaceWith($newElement);
  });
  // 수정을 위한 이벤트와 리스너 묶음

  EventBus.on<{ item: ExtraSelection }>(EVENTS.createOrder.completed, ({ item }) => {
    const $orderTableLeaf = document.querySelector('#order-table');
    $orderTableLeaf?.insertAdjacentElement('beforeend', TableRow({ item }));
  });

  // 커스텀 이벤트로 관리하기
  // addEventListener(EVENTS.createOrder.to.orderedListUI, ((event: CustomEvent) => {
  //   const newItem = event.detail as ExtraSelection;
  //   const $orderTableLeaf = document.querySelector('#order-table');
  //   $orderTableLeaf?.insertAdjacentElement('beforeend', TableRow({ item: newItem }));
  // }) as EventListener);
  return $orderTable;
};

export default OrderTable;
