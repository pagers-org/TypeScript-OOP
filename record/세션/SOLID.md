# SOLID
## S (단일 책임 원칙)
하나의 변경 사항이 생기면 단 하나의 변경점만 있어야 한다.   

```javascript
class Coffee {
  constructor(private name: Names, private ingredients: Ingredients, ...) {}

  //getter, setter

  printRecipe() {
    // print coffee recipe
  }
  orderCounter(){
    // coffee orders = count
  }
}
// 문제점: 커피가 요리를 출력하고 주문 숫자를 세고 있다.
// 해결 방법: orderCount()를 Order 객체로 분리
```

## O (개방 폐쇄 원칙)
은닉화, 캡슐화, 확장에는 열려있고 변경에는 닫혀있다. + 추상화 개념   
HTMLElement안에 있는 innerHTML을 바꿀 수 없다. 추가만 가능하다.    

### 원자적인 추상화
아예 변하지 않을만한 것들... 


```javascript
// :(
// 바닐라 컴포넌트를 기준으로, orderList가 몰라도 바닐라 컴포넌트에 변경은 없으나, orderList를 이용해서 기능을 확장한다.
```

## L (리스코프 치환 원칙)
a에서 만들어진 것도 b에서 만들었을 때 정상적으로 동작해야한다.

### 서브클래싱
아메리카노는 에스프레소에 완벽하게 대치되지 않는다. => 아메리카노는 에스프레소 + 물    

### 서브타이핑
두 가지가 서로 완벽하게 대치되는 관계

```javascript
// :(
// 
```

## I (인터페이스 분리 원칙)
필요한 기능을 만들기 위해 인터페이스를 쪼개고 쪼갠 것을 기준으로 합쳐라(?)

### 인터페이스
이런 형태로 만들어라 라고 강제하는 틀

```javascript
interface Coffee {
  coffeeOrder: () => void;
  coffeeMaking: () => void;
  coffeeServing: () => void;
}
// 문제점: Coffee를 사용할 때 coffeeOrder, coffeeMaking, coffeeServing을 다 구현해야 한다.
// 해결방법: Order, Maker, Serving interface로 나누고 각각의 인터페이스에 coffeeOrder 등을 나눈다.
```

## D (의존성 역전 원칙)
Order는 Espresso를 바라보는 게 아니라 Coffee를 바라보아야 한다.

# SOLID 원칙의 문제점
원칙을 계속 지키다보면 다른 원칙이 깨질 수 있다.