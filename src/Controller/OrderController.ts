import Drink from '@/Model/Drink';
import DrinkFactory from '@/Model/DrinkFactory';

class OrderController {
  // order 모델 객체가 들고 있는 Drink를 보고 kitchen에 추가 되었다고 알려줘야한다.
  // kitchen은 그것을 보고 버튼을 활성화 시킨다.
  observers = [];

  // order를 만들 때, view에서 직접 만들어주는게 아닌 여기서 만들어서 모델 객체를 전달해주면
  // 그걸 토대로 view가 그려주는 것이다.
  // 이렇게 함으로서 비즈니스 로직을 분리할 수 있다. (원래라면 뭔가 변경이 있을 시, 또 그 로직을 해체해야한다.)
  // 이렇게 하면 view에서 사용하는 interface에 새로운 함수를 만들어 이어주면 되기 때문에 모듈형식으로 관리 가능
  orderList: Drink[] = [];
  drinkFactory = DrinkFactory;
  constructor() {}

  // view에서 받은 interaction을 통해 이 함수를 실행
  addDrink = () => {
    // 음료 만들기!!
    const newDrink = this.drinkFactory.createDrink();
    this.orderList.push(newDrink);
    // 만든 음료 반환!!
    return newDrink;
  };

  // 메뉴를 지우는 역할
  // Drink의 name을 찾아 지운다.
  deleteDrink = (index: number) => {
    if (this.orderList.length > 0) {
      if (this.orderList[index]) {
        this.orderList.splice(index, 1);
      }
    }
  };
}

export default OrderController;
