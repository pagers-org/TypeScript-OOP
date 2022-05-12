import { ApiImpl, BeverageService, MenuService, OptionService, Orders } from '@/domain';
import { createCustomElement } from '@/common';
import { MenuSelect } from '@/components/MenuSelect';
import { OrderList } from '@/components/OrderList';

export const api = new ApiImpl();
export const orders = new Orders();
export const beverageService = new BeverageService(api);
export const optionService = new OptionService(api);
export const menuService = new MenuService(api);
export const menu = menuService.getMenu();

window.addEventListener('load', () => {
  createCustomElement('menu-select', MenuSelect);
  createCustomElement('order-list', OrderList);
});

export const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;

document.querySelector('header')?.addEventListener('click', (event: MouseEvent) => {
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
