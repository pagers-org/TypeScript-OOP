import { createDom } from '@/utils';
import OrderDTO from '@/domains/order/OrderDTO';

const TableRow = ({ order }: { order: OrderDTO }) => {
  const template = ({ order }: { order: OrderDTO }) => `
    <div class="table-row" data-order-id="${order.id}" >
        <div class="cell" data-title="No">${order.orderNo}</div>
        <div class="cell" data-title="메뉴명">${order.menuTitle}</div>
        <div class="cell" data-title="사이즈">${order.size}</div>
        <div class="cell" data-title="샷">${order.shots}</div>
        <div class="cell" data-title="시럽">${order.syrup}</div>
        <div class="cell" data-title="ICE/HOT">${order.iceOrHot}</div>
        <div class="cell" data-title="얼음 종류" aria-disabled="${!order.isIceSelectable}">${order.iceType}</div>
        <div class="cell" data-title="휘핑 크림">${order.whippedCream}</div>
        <div class="cell" data-title="엑스트라">${order.extra}</div>
        <div class="cell" data-title="컵">${order.cupType}</div>
        <div class="cell" data-title="수정하기">
            <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
        </div>
        <div class="cell" data-title="삭제하기">
            <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
        </div>
    </div>
`;

  return createDom(template({ order }));
};

export default TableRow;
