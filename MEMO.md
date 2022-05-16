# 타입스크립트에서 enum을 사용하지 않는 게 좋은 이유
https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
> enum을 쓰면 사용하지 않는 코드를 삭제하는 `Tree-shaking`기능을 사용할 수 없다.   
-> 자바스크립트에는 enum이 없어서 타입스크립트 코드에서 자바스크립트 코드로 변환할 때 즉시실행함수를 포함한 코드로 생성이 되는데 번들러는 IIFE를 사용하지 않는 코드로 판단할 수 없기 때문

## keyof typeof란?
https://lovemewithoutall.github.io/it/typescript-keyof-typeof/
> Object에 typeof를 그 객체의 타입이 나온다. Object의 type에 keyof를 하면 그 객체의 key를 string 값으로 해서 | 로 이은 type이 나온다.