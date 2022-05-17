import { Order } from '@/domain';

export const OrderListItemView = (name: string, order: Order) => String.raw`
<div class='table-row order-list-item' data-order-id='${order.getId()}'>
    <div class='cell' data-title='No'></div>
    <div class='cell' data-title='메뉴명'>${name}</div>
    <div class='cell' data-title='사이즈'>${order.getSelectedOptionValue('사이즈')}</div>
    <div class='cell' data-title='샷'>${order.getSelectedOptionValue('샷')}</div>
    <div class='cell' data-title='시럽'>${order.getSelectedOptionValue('시럽')}</div>
    <div class='cell' data-title='ICE/HOT'>${order.getSelectedOptionValue('ICE/HOT')}</div>
    <div class='cell' data-title='얼음 종류'>${order.getSelectedOptionValue('얼음 종류')}</div>
    <div class='cell' data-title='휘핑 크림'>${order.getSelectedOptionValue('휘핑 크림')}</div>
    <div class='cell' data-title='엑스트라'>${order.getSelectedOptionValue('엑스트라')}</div>
    <div class='cell' data-title='컵'>${order.getSelectedOptionValue('컵')}</div>
    <div class='cell' data-title='수정하기'>
      <span class='edit-order'><i class='fa-solid fa-pen'></i></span>
    </div>
    <div class='cell' data-title='삭제하기'>
      <span class='remove-order'><i class='fa-solid fa-trash-can'></i></span>
    </div>
</div>
    `;
