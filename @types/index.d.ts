declare module 'entity' {
  export interface BaseId {
    readonly id: string;
  }

  export interface Korean {
    readonly korean: string;
  }

  type MenuType =
    | 'mocha'
    | 'macchiato'
    | 'americano'
    | 'ristretto'
    | 'lungo'
    | 'espresso'
    | 'capuccino'
    | 'corretto'
    | 'au_lait'
    | 'latte';

  export type OptionalIngredientType =
    | 'size'
    | 'cup-type'
    | 'shots'
    | 'syrup'
    | 'ice/Hot'
    | 'ice-type'
    | 'extra'
    | 'whipped-cream';
  export interface OptionalIngredientEntity extends BaseId {
    readonly type: OptionalIngredientType;
    readonly selectableList: string[];
    readonly default: string;
    currentSelected: string; // 컴포넌트간 통신할 때 생성되는 시점에 현재 선택된 옵션을 기준으로 인스턴스를 생성해야 함
  }

  type RequiredIngredientType =
    | 'shots'
    | 'water'
    | 'milk'
    | 'hotMilk'
    | 'formMilk'
    | 'liqueur'
    | 'chocolate'
    | 'whippedCream';
  export interface RequiredIngredientEntity {
    readonly type: RequiredIngredientType;
    readonly amount: number; // 정수
  }

  export interface MenuEntity extends BaseId, Korean {
    readonly type: MenuType;
    readonly requiredIngredients: RequiredIngredientEntity[];
  }
  //                 준비중        제작중      제공된
  type OrderState = 'preparing' | 'making' | 'provided';

  /**
   * @todo 추후 타입 강화 필요
   * */
  type SelectedOptionEntity = {
    readonly type: string; // ExtraIngredientRecord 의 type 과 매칭되어야 함
    readonly selected: string; // ExtraIngredientRecord 의 selectableList 중 하나와 매칭되어야 함
  };
  export interface OrderEntity extends BaseId {
    readonly menu: MenuEntity;
    readonly orderNo: number;
    optionalIngredients: OptionalIngredientEntity[];
    state: OrderState;
  }

  // 완성품
  export interface BeverageEntity extends BaseId {
    readonly menu: MenuEntity;
    contains: SelectedOptionEntity[];
  }

  // 서빙된 커피 정보 콜랙션
  export interface CompletedMenuEntity extends BaseId {
    readonly completedAt: Date;
    readonly orderedAt: Date;
    readonly Order: OrderEntity;
    readonly beverage: BeverageEntity;
  }
}

declare module 'implementable' {
  // 객체 인터페이스
  import { BeverageEntity, MenuEntity, OrderEntity } from 'entity';

  export interface Equal<T> {
    equal: (there: T) => boolean;
  }

  export interface KitchenManager {
    choice: (menu: MenuEntity) => void;
    createBeverage: (order: OrderEntity) => BeverageEntity;
  }

  // ExtraIngredient 에서 정의한 selectable
  export interface ExtraSelectable {
    select: (option: string) => void;
    getType: () => string;
    getSelected: () => string;
  }
}
