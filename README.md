# 타입스크립트 객체지향 프로그래밍 연습하기

## 프로세스
1. 커피 주문 불러오기를 누르면 랜덤으로 커피 주문 목록이 생성된다.
   ```json
   [
    {
      coffeeName: "아메리카노",
      options: {
        size: "tall",
        shot: 1,
        syrup: 2,
        hot: false,
        ice: "cube",
      }
    },
    {
      coffeeName: "카페 모카",
      options: {
        size: "venti",
        shot: 1,
        syrup: 2,
        hot: false,
        ice: "cube",
        whippedCream: true,
        toping: ["chocolate", "Almond", "cinnamon"]
      }
    },
   ]
   ```
2. 수량을 입력하고 커피를 제조하면 스피너를 커피의 수량만큼(수량 * 1s) 출력하고 커피를 생성한다.

3. 주문이 완료된 커피는 제조한 커피 목록에 추가한다.
   - 제조한 커피의 재료만큼 가진 재료에서 차감한다.

4. 가진 재료가 전부 소모되면 탭을 이동하여 추가할 수 있어야 한다.

<br/>

## 객체 종류
### 오션 카페
- 카페에서 지금까지 제조한 커피 종류

- 카페에서 지금까지 추가된 커피 재료의 양

<br/>

### 커피
> 취급 되어야 하는 속성

- 커피 분류
  - 콜드 브루 커피
  - 브루드 커피
  - 에스프레소
  - 프라푸치노
  - 블렌디드
  - 스타벅스 피지오
  - 티(티바나)
  - 기타 제조 음료
  - 주스

- 소요 시간

- 칼로리

- 필요한 재료

- 금액

- 옵션
  - 뜨겁게 / 차갑게
  - 각얼음 / 잔얼음
  - 안 달게 / 조금 달게 / 달게
  - 휘핑 추가
  - 토핑류
  - 샷

#### 커피 종류(개체에 대한 모델링)
- 아메리카노
  ```json
  americano: {
    name: "아메리카노",
  }
  ```

- 카페 오레
  ```json
  au_lait: {
    name: "카페 오레",
  }
  ```

- 카푸치노
  ```json
  capuccino: {
    name: "카푸치노",
  }
  ```

- 코레또
  ```json
  corretto: {
    name: "코레또",
  }
  ```

- 에스프레소
  ```json
  espresso: {
    name: "에스프레소",
  }
  ```

- 카페 라떼
  ```json
  latte: {
    name: "라떼",
  }
  ```

- 룽고
  ```json
  lungo: {
    name: "룽고",
  }
  ```

- 마끼야또
  ```json
  macchiato: {
    name: "마끼야또",
  }
  ```

- 카페 모카
  ```json
  mocha: {
    name: "카페 모카",
  }
  ```

- 리스트레또
  ```json
  ristretto: {
    name: "리스트레또",
  }
  ```


<br/>

### 재료 종류(행위에 대한 모델링)
- 장바구니???