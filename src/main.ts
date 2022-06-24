import OrderUI from '@/components/OrderUI';
import InMemoryOrderRepository from '@/domains/order/orderRepository/InMemoryOrderRepository';
import OrderDTO from '@/domains/order/OrderDTO';
import KitchenUI from '@/components/KitchenUI';

const pageNav = document.querySelector('header') as HTMLHeadElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;
const $orderList = document.querySelector('.order-list'); // class 실험
const $kitchenUI = document.querySelector('[data-component="kitchenUI"]'); // data-component 데이터셋 실험

const inMemoryOrderRepository = new InMemoryOrderRepository(new Map<string, OrderDTO>());
OrderUI({ $target: $orderList, orderRepository: inMemoryOrderRepository });
KitchenUI({ $target: $kitchenUI, orderRepository: inMemoryOrderRepository });
pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});
