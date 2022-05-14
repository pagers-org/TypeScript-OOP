class CoffeeKitchen {
  private static $ = document.querySelector('#right-section') as HTMLElement;

  private static ACTIONS = {
    SELECT_COFFEE: 'coffee-category-button',
    MAKE_COFFEE: 'coffee-add-options-button',
  };

  public static close() {
    CoffeeKitchen.$.innerHTML = '';
    CoffeeKitchen.$.removeEventListener('click', CoffeeKitchen.handleClickEvent);
  }

  public static open() {
    CoffeeKitchen.$.innerHTML = CoffeeKitchen.template;
    CoffeeKitchen.$.addEventListener('click', CoffeeKitchen.handleClickEvent);
  }

  public static handleClickEvent(event: MouseEvent) {
    const target = event.target as HTMLElement;
    switch (true) {
      case (target as HTMLElement)?.className === CoffeeKitchen.ACTIONS.SELECT_COFFEE:
        //
        break;
      case (target as HTMLElement)?.className === CoffeeKitchen.ACTIONS.MAKE_COFFEE:
        event.preventDefault();
        break;
      default:
        console.log(event.target);
        return;
    }
  }

  private static template = `
    <h1>주방</h1>
    <div class="coffee-container">
      <h1 class="coffee_name">Choose your coffee</h1>
      <div class="cup">
        <div class="filling reset">
          <div class="coffee">커피</div>
          <div class="water">물</div>
          <div class="liquor">리퀴르</div>
          <div class="milk">우유</div>
          <div class="whipped_cream">휘핑 크림</div>
          <div class="milk_foam">밀크 폼</div>
          <div class="steamed_milk">데운 우유</div>
          <div class="chocolate">초콜릿</div>
        </div>
        <div class="plate"></div>
      </div>
    </div>
    <div class="select-coffee-container">
      <div class="row">
        <div>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="americano">아메리카노</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="au_lait">카페 오레</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="capuccino">카푸치노</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="corretto">코레또</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="espresso">에스프레소</button>
        </div>
        <div>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="latte">카페 라떼</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="lungo">룽고</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="macchiato">마끼야또</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="mocha">카페 모카</button>
          <button class="${CoffeeKitchen.ACTIONS.SELECT_COFFEE}" id="ristretto">리스트레또</button>
        </div>
      </div>
      <div class="row">
        <div class="coffee-add-area">
          <form>
            <button type="submit" class="${CoffeeKitchen.ACTIONS.MAKE_COFFEE}">만들기</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

export default CoffeeKitchen;
