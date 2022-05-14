import { ExtraIngredientRecord, Menu } from 'dto';

export const MENUS: Menu[] = [
  {
    id: 'americano',
    type: 'americano',
    required: [
      { type: 'shot', amount: 2 },
      { type: 'water', amount: 5 },
    ],
  },
  {
    id: 'espresso',
    type: 'espresso',
    required: [{ type: 'shot', amount: 3 }],
  },
  {
    id: 'cappuccino',
    type: 'cappuccino',
    required: [
      { type: 'shot', amount: 3 },
      { type: 'formMilk', amount: 3 },
      { type: 'hotMilk', amount: 3 },
    ],
  },
];

export const EXTRA_OPTIONS: ExtraIngredientRecord[] = [
  { type: 'size', selectableList: ['tall', 'grande', 'venti'], default: 'tall' },
  { type: 'cup', selectableList: ['reusable', 'mug', 'tumbler', 'disposable'], default: 'reusable' },
  { type: 'shots', selectableList: ['none', '1shot', '2shots', '3shots'], default: 'none' },
];
