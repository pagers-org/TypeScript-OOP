import { createCustomElement } from '@/common';
import { Header, Menu, MenuButton, Modal, OrderList, OrderListItem, Served, ServedItem } from '@/components';
import { App } from '@/App';
import { Cafe } from '@/cafe';
import { Orders, Servings } from '@/domain';
import { FetchApi } from '@/api/FetchApi';

// const api =new InMemoryApi();
const api = new FetchApi();

new App(new Cafe(api, new Orders(), new Servings()));

createCustomElement('cafe-header', Header);
createCustomElement('cafe-menu', Menu);
createCustomElement('cafe-menu-button', MenuButton);
createCustomElement('cafe-order-list', OrderList);
createCustomElement('cafe-order-list-item', OrderListItem);
createCustomElement('cafe-modal', Modal);
createCustomElement('cafe-served', Served);
createCustomElement('cafe-served-item', ServedItem);
