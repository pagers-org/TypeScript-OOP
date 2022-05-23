# Declare 키워드
declare let / const / function / class    
변수, 상수, 함수, 클래스가 **어딘가에 생성**되어 있다.

## 특징 : "선언하다"
1. Javascript 코드로 컴파일되지 않고, Typescript 코드로 컴파일된다.
2. Type / Interface는 Javascript 코드로 컴파일 되지 않으므로 불필요하다.

## `*.d.ts` 란?
선언부만 있다. 절대 구현부가 있을 수 없다. (const / let 등등)   
`tsconfig.json`의 `skipLibCheck` 프로퍼티에 따라 규칙 강제 여부를 결정한다.      
declare namespace, declare module은 export가 자동으로 할당한다.   
`d.ts`를 상위에 해줄 경우 import 없이 사용가능하다.   

## declare namespace
블록 스코프를 생성해주는 것. 전역적으로 생성되는 객체    
`window.CoffeeLib` / `globalThis.CoffeeLib`

```typescript
declare namespace CoffeeLib {
  function makeCoffee(coffee: string): string;
  let indexOfCoffee: number;
}
// const a = CoffeeLib.indexOfCoffee
```

## declare module
export 생략 가능.
```typescript
declare module 'oop-cafe' {
  type CoffeeNames = 'a'
}
// import { CoffeeNames } from 'oop-cafe';
// const coffee: CoffeeName = 'a'
```

## declare class
```typescript
declare class Order {
  constructor(order: unknown);
  orderList: unknown[];
  showOrder(): void;
}
```

## declare function
```typescript
declare function getCoffeeIngredients(n: number): number;
//const x = getCoffeeIngredients(43);
```