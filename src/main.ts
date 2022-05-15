import { createCustomElement } from '@/common';
import { Header, Menu, Modal, OrderList, OrderListRow, Serving } from '@/components';
import { createMenu, Orders } from '@/domain';
import { AppEventHandler } from '@/app/AppEventHandler';
import { App } from '@/app/App';
import { Store } from '@/app/Store';

window.addEventListener('load', () => {
  createCustomElement('cafe-header', Header);
  createCustomElement('cafe-menu', Menu);
  createCustomElement('cafe-order-list', OrderList);
  createCustomElement('cafe-order-list-row', OrderListRow);
  createCustomElement('cafe-modal', Modal);
  createCustomElement('cafe-serving', Serving);
});

const store = new Store(new Orders(), createMenu());

new App(store, new AppEventHandler(store));
