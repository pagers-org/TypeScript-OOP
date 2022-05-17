import { $ } from './helper/dom';
import OrderModel from './model/order';
import OrderView from './view/order';
import OrderController from './controller/order';

const pageNav = $<HTMLHeadElement>('header');
pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

const orderModel = new OrderModel();
const orderView = new OrderView(orderModel);
new OrderController(orderModel, orderView);
