import { createCustomElement } from '@/common';
import { Header, Menu, Modal, OrderList, OrderListRow, Serving } from '@/components';
import { App } from '@/App';

window.addEventListener('load', () => {
  createCustomElement('cafe-header', Header);
  createCustomElement('cafe-menu', Menu);
  createCustomElement('cafe-order-list', OrderList);
  createCustomElement('cafe-order-list-row', OrderListRow);
  createCustomElement('cafe-modal', Modal);
  createCustomElement('cafe-serving', Serving);
});

export const app = new App();
