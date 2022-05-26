declare module 'dto' {
  export interface BaseId {
    readonly id: string;
  }
  type MenuType = 'americano' | 'espresso' | 'cappuccino';

  export interface ExtraIngredientRecord extends BaseId {
    readonly type: string;
    readonly selectableList: string[];
    readonly default: string;
    currentSelected: string; // 컴포넌트간 통신할 때 생성되는 시점에 현재 선택된 옵션을 기준으로 인스턴스를 생성해야 함
  }

  export interface RequiredIngredient {
    readonly type: string;
    readonly amount: number; // 정수
  }
  export interface Menu extends BaseId {
    readonly type: MenuType;
    readonly requiredIngredients: RequiredIngredient[];
    // selectableIngredients: string[]; // Ingredient name
  }
  //                 준비중        제작중      제공된
  type OrderState = 'pending' | 'making' | 'provided';

  /**
   * @todo 추후 타입 강화 필요
   * */
  type SelectedOption = {
    readonly type: string; // ExtraIngredientRecord 의 type 과 매칭되어야 함
    readonly selected: string; // ExtraIngredientRecord 의 selectableList 중 하나와 매칭되어야 함
  };
  export interface Order extends BaseId {
    readonly menu: Menu;
    readonly orderNo: number;
    extraOptions: SelectedOption[];
    state: OrderState;
  }
  export interface Beverage extends BaseId {
    readonly menu: Menu;
    contains: SelectedOption[];
  }

  // 서빙된 커피 정보 콜랙션
  export interface CompletedMenuRecord extends BaseId {
    readonly completedAt: Date;
    readonly orderedAt: Date;
    readonly Order: Order;
    readonly beverage: Beverage;
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
