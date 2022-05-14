import { ApiImpl, BeverageService, MenuService, OptionService, Orders } from '@/domain';
import { createCustomElement } from '@/common';
import { CafeMenuSelect } from '@/components/CafeMenuSelect';
import { CafeOrderList } from '@/components/CafeOrderList';
import { CafeHeader } from '@/components/CafeHeader';

export const api = new ApiImpl();
export const orders = new Orders();
export const beverageService = new BeverageService(api);
export const optionService = new OptionService(api);
export const menuService = new MenuService(api);
export const menu = menuService.getMenu();

window.addEventListener('load', () => {
  createCustomElement('cafe-header', CafeHeader);
  createCustomElement('cafe-menu-select', CafeMenuSelect);
  createCustomElement('cafe-order-list', CafeOrderList);
});

export const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;

modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});
