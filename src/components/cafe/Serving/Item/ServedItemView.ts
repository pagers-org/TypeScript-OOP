import { Serving } from '@/domain';
import moment from 'moment';

export const ServedItemView = (serving: Serving) => {
  const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

  return String.raw`
    <div class="table-row" data-id='${serving.getOrderId()}'>
      <div class="cell" data-title="No"></div>
      <div class="cell" data-title="메뉴">${serving.getBeverageName()}</div>
      <div class="cell" data-title="최근 주문 시간">${moment(serving.getOrderTime()).format(DATE_FORMAT)}</div>
      <div class="cell" data-title="최근 서빙 완료 시간">${moment(serving.getServingTime()).format(DATE_FORMAT)}</div>
    </div>
    `;
};
