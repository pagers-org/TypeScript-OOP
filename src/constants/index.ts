import { ExtraIngredientRecord, Menu } from 'dto';

export const MENUS: Menu[] = [
  {
    id: 'americano',
    type: 'americano',
    requiredIngredients: [
      { type: 'shot', amount: 2 },
      { type: 'water', amount: 5 },
    ],
  },
  {
    id: 'espresso',
    type: 'espresso',
    requiredIngredients: [{ type: 'shot', amount: 3 }],
  },
  {
    id: 'cappuccino',
    type: 'cappuccino',
    requiredIngredients: [
      { type: 'shot', amount: 3 },
      { type: 'formMilk', amount: 3 },
      { type: 'hotMilk', amount: 3 },
    ],
  },
];

export const EXTRA_OPTIONS: ExtraIngredientRecord[] = [
  { id: 'size', type: 'size', selectableList: ['tall', 'grande', 'venti'], default: 'tall', currentSelected: 'tall' },
  {
    id: 'cup',
    type: 'cup',
    selectableList: ['reusable', 'mug', 'tumbler', 'disposable'],
    default: 'reusable',
    currentSelected: 'reusable',
  },
  {
    id: 'shots',
    type: 'shots',
    selectableList: ['none', '1shot', '2shots', '3shots'],
    default: 'none',
    currentSelected: 'none',
  },
];

export const EVENTS = {
  createOrder: { random: 'createOrderRandom', completed: 'createOrderCompleted' },
  deleteOrder: {
    byId: 'deleteOrderById',
  },
  editOrder: {
    byId: 'editOrderById',
    completed: 'editOrderCompleted',
  },
} as const;
