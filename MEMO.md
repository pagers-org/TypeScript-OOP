# 타입스크립트에서 enum을 사용하지 않는 게 좋은 이유
https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
> enum을 쓰면 사용하지 않는 코드를 삭제하는 `Tree-shaking`기능을 사용할 수 없다.   
-> 자바스크립트에는 enum이 없어서 타입스크립트 코드에서 자바스크립트 코드로 변환할 때 즉시실행함수를 포함한 코드로 생성이 되는데 번들러는 IIFE를 사용하지 않는 코드로 판단할 수 없기 때문

## keyof typeof란?
https://lovemewithoutall.github.io/it/typescript-keyof-typeof/
> Object에 typeof를 그 객체의 타입이 나온다. Object의 type에 keyof를 하면 그 객체의 key를 string 값으로 해서 | 로 이은 type이 나온다.

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
     
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions
> 화살표 함수가 나오기 전까지는, 모든 새로운 함수는, 어떻게 그 함수가 호출되는지에 따라 자신의 this 값을 정의했습니다.   
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

# innerHTML vs insertAdjacentHTML
https://chanto11.tistory.com/51
> insertAdjacentHTML: 추가 파싱 없이 기존의 DOM tree에 node를 추가한다.
innerHTML: 새로운 node로 교체한다. 추가적으로 파싱 작업이 진행된다.

> innerHTML의 사용은 가급적 피하는 것이 좋다. HTML 문자열을 그대로 추가하는 것이기 떄문에 XSS 공격의 위험으로 보안상으로도 문제가 되고 파싱 작업으로 인해 성능면에서도 떨어진다!

## Javascript string으로 Element 생성하는 방법
https://skout90.github.io/2017/08/12/Javascript/string-%EC%9C%BC%EB%A1%9C-element%EB%A7%8C%EB%93%A4%EA%B8%B0/    
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
> Template Element를 사용한다.

# 이벤트 위임
https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/

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

# Element.closest()
https://developer.mozilla.org/ko/docs/Web/API/Element/closest
> 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회한다.
