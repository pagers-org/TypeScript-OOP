import { createCustomElement } from '@/common';
import { Header, Menu, Modal, OrderList, OrderListRow, Serving } from '@/components';
import { createMenu, Orders } from '@/domain';
import { App } from '@/App';
import { Cafe } from '@/store/Cafe';

window.addEventListener('load', () => {
  createCustomElement('cafe-header', Header);
  createCustomElement('cafe-menu', Menu);
  createCustomElement('cafe-order-list', OrderList);
  createCustomElement('cafe-order-list-row', OrderListRow);
  createCustomElement('cafe-modal', Modal);
  createCustomElement('cafe-serving', Serving);
});

new App(new Cafe(new Orders(), createMenu()));
