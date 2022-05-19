# 타입스크립트에서 enum을 사용하지 않는 게 좋은 이유
> https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/

enum을 쓰면 사용하지 않는 코드를 삭제하는 `Tree-shaking`기능을 사용할 수 없다.   
→ 자바스크립트에는 enum이 없어서 타입스크립트 코드에서 자바스크립트 코드로 변환할 때 즉시실행함수를 포함한 코드로 생성이 되는데 번들러는 IIFE를 사용하지 않는 코드로 판단할 수 없기 때문이다.

## keyof typeof란?
> https://lovemewithoutall.github.io/it/typescript-keyof-typeof/

Object에 typeof를 그 객체의 타입이 나온다. Object의 type에 keyof를 하면 그 객체의 key를 string 값으로 해서 | 로 이은 type이 나온다.

---

# arrow Function
```javascript
// 기존 코드
// order.controller.ts
onOrderListChanged(coffees: CoffeeDTO[]) {
  this.orderView.createOrderTable(coffees);
}
handleAddCoffee (coffee: CoffeeDTO) {
  console.log(`handleAddCoffee: ${JSON.stringify(coffee)}`);
  this.orderService.addCoffee(coffee);
}
```
처음에 arrow function을 사용하지 않고 위처럼 코드를 작성했는데 `order.view.ts`나 `order.service.ts`에서 `order.controller.ts`로 넘어오면 this가 undefined로 발생했다.  
     
> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions   
화살표 함수가 나오기 전까지는, 모든 새로운 함수는, 어떻게 그 함수가 호출되는지에 따라 자신의 this 값을 정의했습니다.   
화살표 함수는 자신의 this가 없습니다.  대신 화살표 함수를 둘러싸는 **렉시컬 범위(lexical scope)의 this가 사용**됩니다. 화살표 함수는 일반 변수 조회 규칙(normal variable lookup rules)을 따릅니다. 때문에 현재 범위에서 존재하지 않는 this를 찾을 때, 화살표 함수는 바로 바깥 범위에서 this를 찾는것으로 검색을 끝내게 됩니다.
```javascript
// 수정된 코드
// order.controller.ts
onOrderListChanged = (coffees: CoffeeDTO[]) => {
  this.orderView.createOrderTable(coffees);
}
handleAddCoffee = (coffee: CoffeeDTO) => {
  console.log(`handleAddCoffee: ${JSON.stringify(coffee)}`);
  this.orderService.addCoffee(coffee);
}
```
**다나**의 도움으로(🥳) arrow function을 사용하여 문제를 해결할 수 있었다.

---

# innerHTML vs insertAdjacentHTML
> https://chanto11.tistory.com/51

**insertAdjacentHTML**: 추가 파싱 없이 기존의 DOM tree에 node를 추가한다.   
**innerHTML**: 새로운 node로 교체한다. 추가적으로 파싱 작업이 진행된다.

innerHTML의 사용은 가급적 피하는 것이 좋다. HTML 문자열을 그대로 추가하는 것이기 떄문에 XSS 공격의 위험으로 보안상으로도 문제가 되고 파싱 작업으로 인해 성능면에서도 떨어진다!

## Javascript string으로 Element 생성하는 방법
> https://skout90.github.io/2017/08/12/Javascript/string-%EC%9C%BC%EB%A1%9C-element%EB%A7%8C%EB%93%A4%EA%B8%B0/    
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template

Template Element를 사용한다.

---

# 이벤트 위임
> https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/

### 예시 코드
```html
<div id="wrapper">
  <h1>안녕하세요</h1>
  <div id="detail">
    <p>테스트 데이터</p> // 클릭 이벤트 설정
  </div>
</div>
```

## 이벤트 버블링
특정화면 요소에서 이벤트가 발생할 때 이벤트 요소가 상위의 요소로 전달되어가는 특성이다. (하위 요소 > 상위 요소)   
예시 코드에서 p에 클릭 이벤트를 설정했다면 `p` > `#detail`> `#wrapper`순서로 이벤트가 전달된다.

## 이벤트 캡쳐링
이벤트 버블링과 반대로 진행되는 이벤트 전파 방식이다. (상위 요소 > 하위 요소)   
이벤트 리스너에 `capture: true`로 설정하여 사용할 수 있다.   
예시 코드에서 p에 클릭 이벤트를 설정했다면 `#wrapper`> `#detail`> `p`순서로 이벤트가 전달된다.

## 이벤트 위임
하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식이다.  
이벤트 버블링을 사용하여 구현할 수 있다.

---

# Element.closest()
> https://developer.mozilla.org/ko/docs/Web/API/Element/closest   
> 
주어진 CSS 선택자와 일치하는 요소를 찾을 때까지 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회한다.

---

# 타입 좁히기 (Type Narrowing)
> https://ahnheejong.gitbook.io/ts-for-jsdev/06-type-system-deepdive/type-narrowing   
https://medium.com/humanscape-tech/typescript%EA%B0%80-%ED%83%80%EC%9E%85%EC%9D%84-%EC%A2%81%ED%98%80%EA%B0%80%EB%8A%94-%EB%B2%95-c5c318982967   
https://www.yongdam.sh/blog/effective-typescript-narrowing

### 예시 코드

```typescript
interface Cat {
  latestFood? : string; // undefined 또는 string이 될 수 있음
}
function eat(c: Cat): boolean {
  // A
  if(c.latestFood === undefined) {
    return false;
  }

  //B: A에서 undefined 타입이 걸러졌기에 string만 남음
  const food = c.latestFood;
  return true;
}
```

위와 같은 예시로 넓은 타입을 가진 변수를 더 좁은 타입으로 재정의 하는 행위를 **타입 좁히기**라 부른다.   
만약 타입 좁히기가 없다면 불필요한 런타임 검사를 계속 해야하고 결과적으로 유니온 타입을 사용하기가 불편해질 것이다.

# 타입 가드 (Type Guard)
특정 스코프내에서 값의 타입을 좁히는 즉, 타입 좁히기를 유발하는 표현을 타입 가드라고 부른다.

## 제어 흐름 분석 (control flow analysis)
프로그램이 실행되는 구문이나 함수가 호출되는 순서를 제어 흐름이라 하며, Typescript에서는 제어 흐름 분석을 통해 특정한 시점에 프로그램이 어떤 상태를 가지고 있는지 파악한 뒤 파악한 값을 기반으로 특정 값의 타입을 제한할 수 있다.
   
Javascript와 Typescript에서 사용할 수 있는 대표적인 제어문
- 조건: if, else if, else
- 반복: for, while
- switch ~ case
- break ~ continue
- throw
- return

### undefind / null
예시 코드 참고

### 리터럴 타입과의 비교
```typescript
interface Dog {
  type: 'dog';
  name: string;
}
interface Cat {
  type: 'cat';
  food: string;
}
type Animal = Dog | Cat;

function doSomething(animal: Animal) {
  switch(animal.type) {
    case 'cat': {
      return animal.food; //animal은 Cat 타입
    }
    case 'dog': {
      return animal.name; //animal은 Dog 타입
    }
    default: {
      return ; //animal은 never 타입
    }
  }
}
```

### typeof 연산자 / instanceof 연산자 / in 연산자
```typescript
// typeof 연산자
// 보통의 프로그래머의 예상과는 다르게 동작되므로 ([]가 array 타입으로 나오지 않음) 단순한 타입에서만 사용하는 것을 권장한다.
function typeOfExample(animalId: number | string) {
  if (typeof animalId === 'string') return parseInt(animalId);
  return animalId;
}
``` 
```typescript
// instanceof 연산자
interface Animal {
  getName(): string;
}
class Dog implements Animal {
  constructor(private name: string) {}
  getName() { return this.name + " 입니다🐶"; }
}
class Cat implements Cat {
  constructor(private name: string) {}
  getName() { return this.name + " 입니다😺"; }
}

function getAnimalName(prefer: string) { 
  return prefer === '강아지' ? new Dog('댕댕이') : new Cat('냥이');
}
let animalName: Animal = getAnimalName('강아지');
if(animalName instanceof Dog){
  console.log(animalName.getName()); // Dog
}
if(animalName instanceof Cat) {
  console.log(animalName.getName()); // Cat
}
```
```typescript
// in 연산자
interface Dog {
  legs: 4,
  walk(): void;
}
interface Bird {
  fly(): void;
}

type Animal = Dog | Bird;
function doSomething(animal: Animal) {
  if('legs' in animal) {
    animal.walk(); // Dog
  } else {
    animal.fly(); // Fish
  }
}
```


## 사용자 정의 타입 가드 (user defined type guard)
프로그래머가 값을 어떤 타입으로 좁혀야 하는지 직접 명시할 수 있는 수단   
사용자 정의 타입 가드는 `value is Type` **형태의 반환 타입**을 갖는 함수로 정의한다. 위의 in 연산자의 예시를 사용자 정의 타입 가드로 수정하면 아래와 같다.
```typescript
function isFly(animal: Animal): animal is Bird {
  return 'legs' in animal ? false : true;
}
function doSomething(animal: Animal){
  if(isFly(animal)) {
    animal.fly();
  } else {
    animal.walk();
  }
}
```

## 제어 흐름 분석 vs 사용자 정의 타입 가드 
초기 타입스크립트는 타입 시스템의 힘이 강력하지 않았고 제어 흐름 분석에 기반한 타입 좁히기가 거의 이루어지지 않았다. 때문에 사용자 정의 타입 가드를 사용해야 하는 경우가 많았다. 하지만 꾸준한 발전을 이룬 오늘날의 타입스크립트는 타입 좁히기가 똑똑하게 이루어지고 대부분의 사용례는 위에서 다룬 내장 타입 가드로도 충분히 커버할 수 있다.