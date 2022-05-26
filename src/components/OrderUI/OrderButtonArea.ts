import { castEventTargetToElement, createDom } from '@/utils';
import EventBus from '@/businessLogic/core/EventBus';
import { EVENTS } from '@/constants';

const OrderButtonArea = () => {
  const $element = createDom(`
    <div class="order-button-area">
        <button class="order-button">주문 받기</button>
    </div>
`);

  $element.addEventListener('click', e => {
    const eventTarget = castEventTargetToElement(e.target);
    if (!eventTarget.closest('.order-button')) return;
    EventBus.emit(EVENTS.createOrder.random);
  });
  return $element;
};

export default OrderButtonArea;
