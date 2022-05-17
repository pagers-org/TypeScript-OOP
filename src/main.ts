import { createCustomElement } from '@/common';
import { Header, Menu, MenuButton, Modal, OrderList, OrderListItem, Served } from '@/components';
import { App } from '@/App';
import { Cafe, createMenu } from '@/cafe';
import { Orders, Servings } from '@/domain';
import { ServedItem } from '@/components/cafe/Serving/Item/ServedItem';

new App(new Cafe(new Orders(), createMenu(), new Servings()));

createCustomElement('cafe-header', Header);
createCustomElement('cafe-menu', Menu);
createCustomElement('cafe-menu-button', MenuButton);
createCustomElement('cafe-order-list', OrderList);
createCustomElement('cafe-order-list-item', OrderListItem);
createCustomElement('cafe-modal', Modal);
createCustomElement('cafe-served', Served);
createCustomElement('cafe-served-item', ServedItem);
