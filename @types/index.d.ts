declare module 'dto' {
  export interface BaseId {
    id: string;
  }
  type MenuType = 'americano' | 'espresso' | 'cappuccino';

  export interface ExtraIngredientRecord {
    type: string;
    selectableList: string[];
    default: string;
  }

  export interface RequiredIngredient {
    type: string;
    amount: number; // 정수
  }
  export interface Menu extends BaseId {
    type: MenuType;
    required: RequiredIngredient[];
    // selectableIngredients: string[]; // Ingredient name
  }
  //                 준비중        제작중      제공된
  type OrderState = 'pending' | 'making' | 'provided';

  /**
   * @todo 추후 타입 강화 필요
   * */
  type SelectedOption = {
    type: string; // ExtraIngredientRecord 의 type 과 매칭되어야 함
    selected: string; // ExtraIngredientRecord 의 selectableList 중 하나와 매칭되어야 함
  };
  export interface Order extends BaseId {
    menu: Menu;
    extraOptions: SelectedOption[];
    state: OrderState;
  }
  export interface Beverage extends BaseId {
    completedAt: Date; // 의문 -> 음료자체에 완성된 시간을 가지고 있는게 의미가 맞는가...?
    menu: Menu;
    contains: SelectedOption[];
  }

  export interface CompletedMenuRecord extends BaseId {
    completedAt: Date;
    orderedAt: Date;
    Order: Order;
  }
}

declare module 'ObjectInterface' {
  // 객체 인터페이스
  import { Beverage, Menu, Order, SelectedOption } from 'dto';

  export interface Comparable<T> {
    equal: (there: T) => boolean;
  }
  export interface KitchenManager {
    choice: (menu: Menu) => void;
    createBeverage: (order: Order) => Beverage;
  }

  // ExtraIngredient 에서 정의한 selectable
  export interface ExtraSelectable {
    select: (option: SelectedOption) => void;
    getType: () => string;
    getSelected: () => string;
  }
}
