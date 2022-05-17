import { App } from '@/App';
import { Cafe, createMenu } from '@/cafe';
import { Orders, Servings } from '@/domain';
import { createCustomElement } from '@/common';
import { BaseComponent } from '@/components';

createCustomElement('app-component', BaseComponent);

new App(new Cafe(new Orders(), createMenu(), new Servings()));
