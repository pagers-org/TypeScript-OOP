import { OptionalIngredientEntity, MenuEntity } from 'entity';

export const MENUS: MenuEntity[] = [
  {
    id: 'americano',
    type: 'americano',
    korean: '아메리카노',
    requiredIngredients: [
      { type: 'shots', amount: 4 },
      { type: 'water', amount: 6 },
    ],
  },
  {
    id: 'au_lait',
    type: 'au_lait',
    korean: '카페오레',
    requiredIngredients: [
      { type: 'shots', amount: 5 },
      { type: 'milk', amount: 5 },
    ],
  },
  {
    id: 'espresso',
    type: 'espresso',
    korean: '에스프레소',
    requiredIngredients: [{ type: 'shots', amount: 4 }],
  },
  {
    id: 'capuccino',
    type: 'capuccino',
    korean: '카푸치노',
    requiredIngredients: [
      { type: 'shots', amount: 3.5 },
      { type: 'hotMilk', amount: 3 },
      { type: 'formMilk', amount: 3.5 },
    ],
  },
  {
    id: 'corretto',
    type: 'corretto',
    korean: '코레또',
    requiredIngredients: [
      { type: 'shots', amount: 5.5 },
      { type: 'liqueur', amount: 2 },
    ],
  },
  {
    id: 'latte',
    type: 'latte',
    korean: '카페라떼',
    requiredIngredients: [
      { type: 'shots', amount: 4 },
      { type: 'hotMilk', amount: 4 },
      { type: 'formMilk', amount: 3.5 },
    ],
  },
  {
    id: 'lungo',
    type: 'lungo',
    korean: '룽고',
    requiredIngredients: [
      { type: 'shots', amount: 5 },
      { type: 'water', amount: 5 },
    ],
  },
  {
    id: 'macchiato',
    type: 'macchiato',
    korean: '마끼야또',
    requiredIngredients: [
      { type: 'shots', amount: 3 },
      { type: 'formMilk', amount: 7 },
    ],
  },
  {
    id: 'mocha',
    type: 'mocha',
    korean: '카페모카',
    requiredIngredients: [
      { type: 'shots', amount: 4 },
      { type: 'chocolate', amount: 2 },
      { type: 'hotMilk', amount: 2 },
      { type: 'whippedCream', amount: 2 },
    ],
  },
  {
    id: 'ristretto',
    type: 'ristretto',
    korean: '리스트레또',
    requiredIngredients: [{ type: 'shots', amount: 2 }],
  },
];

export const OPTIONAL_INGREDIENTS: OptionalIngredientEntity[] = [
  { id: 'size', type: 'size', selectableList: ['tall', 'grande', 'venti'], default: 'tall', currentSelected: 'tall' },
  {
    id: 'shots',
    type: 'shots',
    selectableList: ['none', '1shot', '2shots', '3shots'],
    default: 'none',
    currentSelected: 'none',
  },
  {
    id: 'syrup',
    type: 'syrup',
    selectableList: ['none', '바닐라', '헤이즐넛', '카라멜'],
    default: 'none',
    currentSelected: 'none',
  },
  {
    id: 'ice/Hot',
    type: 'ice/Hot',
    selectableList: ['ice', 'hot'],
    default: 'ice',
    currentSelected: 'ice',
  },
  {
    id: 'ice-type',
    type: 'ice-type',
    selectableList: ['기본 얼음', '각 얼음'],
    default: '기본 얼음',
    currentSelected: '기본 얼음',
  },
  {
    id: 'whipped-cream',
    type: 'whipped-cream',
    selectableList: ['none', '적당히', '많이'],
    default: 'none',
    currentSelected: 'none',
  },
  {
    id: 'extra',
    type: 'extra',
    selectableList: ['none', '자바칩', '카라멜 드리즐', '초코 드리즐', '아몬드', '시나몬'],
    default: 'none',
    currentSelected: 'none',
  },
  {
    id: 'cup-type',
    type: 'cup-type',
    selectableList: ['1회용 컵', '텀블러', '재활용컵', '머그컵'],
    default: '재활용컵',
    currentSelected: '재활용컵',
  },
];

export const EVENTS = {
  createOrder: { random: 'createOrderRandom', completed: 'createOrderCompleted' },
  deleteOrder: {
    byId: 'deleteOrderById',
    completed: 'deleteOrderCompleted',
  },
  editOrder: {
    byId: 'editOrderById',
    completed: 'editOrderCompleted',
  },
} as const;
