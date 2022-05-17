import { Serving } from '@/domain';

export const ServedItemView = (serving: Serving) => {
  return String.raw`
    <div class="table-row" data-id='${serving.getOrderId()}'>
      <div class="cell" data-title="No"></div>
      <div class="cell" data-title="메뉴">${serving.getBeverageName()}</div>
      <div class="cell" data-title="최근 주문 시간">${serving.getOrderTime()}</div>
      <div class="cell" data-title="최근 서빙 완료 시간">${serving.getServingTime()}</div>
    </div>
    `;
};
