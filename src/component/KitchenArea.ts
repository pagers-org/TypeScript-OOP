import { $, $all } from '@/helper/dom';
import { order } from '@/coffee/order';
import { NO_COFFEE_ORDER, NO_ORDER } from '@/constant';
import { Template } from '@/view/Template';
import { CoffeeOrderType } from '@/@types';

export default class KitchenArea extends Template {
  constructor() {
    super();
    this.manageKitchen();
    this.bindEvent();
  }

  bindEvent() {
    const makeButton = $<HTMLButtonElement>('.coffee-add-options-button');
    const serveButton = $<HTMLDivElement>('.coffee-serve-area');
    const closeButton = $<HTMLSpanElement>('#close-icon');
    const coffeeOptionsButton = $all<HTMLButtonElement>('.coffee-category-button');

    coffeeOptionsButton.forEach(btn => btn.addEventListener('click', this.makeCoffee.bind(this)));

    closeButton.addEventListener('click', e => {
      e.preventDefault();
      this.toggleModal();
    });

    makeButton.addEventListener('click', e => {
      e.preventDefault();
      if (order._orders.length <= 0) return alert(NO_ORDER);
      this.toggleModal();
    });

    serveButton.addEventListener('click', e => {
      e.preventDefault();
      //serve
      this.toggleModal();
    });
  }

  makeCoffee(e) {
    const $target = e.target;
    const selectedMenusOnly = order.getOrderByName($target.textContent);
    if (selectedMenusOnly.length <= 0) return alert(NO_COFFEE_ORDER);

    const coffeeName = $<HTMLHeadElement>('.coffee_name');
    const coffeeFilling = $<HTMLDivElement>('.filling');
    const coffeeOptionsButton = $all<HTMLButtonElement>('.coffee-category-button');
    const modalCoffeeName = $<HTMLDivElement>('.selected-coffee-option');

    coffeeOptionsButton.forEach(btn => {
      btn.classList.remove('selected');
      coffeeFilling.classList.remove(btn.id);
    });

    coffeeName.textContent = $target.textContent;
    coffeeFilling.classList.add($target.id);
    $target.classList.add('selected');
    order.selectCoffee($target.id, $target.textContent);

    modalCoffeeName.textContent = order._selectedCoffee.name + ' 옵션';
    this.getModalCoffeeTable($target.textContent);
  }

  getModalCoffeeTable(selectedCoffee: string) {
    const filterd = order.getOrderByName(selectedCoffee);

    filterd.map((coffee: CoffeeOrderType) => {
      return `<div class="table-row">
          <div class="cell" data-title="${coffee._id}">1</div>
          <div class="cell" data-title="메뉴명">${coffee.menu}</div>
          <div class="cell" data-title="사이즈">${coffee.size}</div>
          <div class="cell" data-title="샷">${coffee.shot}</div>
          <div class="cell" data-title="시럽">${coffee.syrup}</div>
          <div class="cell" data-title="ICE/HOT">${coffee.iceOrHot}</div>
          <div class="cell" data-title="얼음 종류">${coffee.ice}</div>
          <div class="cell" data-title="휘핑 크림">${coffee.cream}</div>
          <div class="cell" data-title="엑스트라">${coffee.extra}</div>
          <div class="cell" data-title="컵">${coffee.cup}</div>
        </div>`;
    });
  }
  toggleModal() {
    const modal = $<HTMLDivElement>('.modal-layout');
    modal.classList.toggle('hidden');
  }

  manageKitchen() {
    const rootNode = $<HTMLDivElement>('#right-section');
    if (order._orders.length <= 0) {
      return (rootNode.innerHTML = `<div id="none-order"></div>`);
    }
    return rootNode.insertAdjacentHTML('afterbegin', this.template());
  }
  template() {
    return `
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
              <button class="coffee-category-button" id="americano">아메리카노</button>
              <button class="coffee-category-button" id="au_lait">카페 오레</button>
              <button class="coffee-category-button" id="capuccino">카푸치노</button>
              <button class="coffee-category-button" id="corretto">코레또</button>
              <button class="coffee-category-button" id="espresso">에스프레소</button>
            </div>
            <div>
              <button class="coffee-category-button" id="latte">카페 라떼</button>
              <button class="coffee-category-button" id="lungo">룽고</button>
              <button class="coffee-category-button" id="macchiato">마끼야또</button>
              <button class="coffee-category-button" id="mocha">카페 모카</button>
              <button class="coffee-category-button" id="ristretto">리스트레또</button>
            </div>
          </div>
          <div class="row">
            <div class="coffee-add-area">
              <form>
                <button type="submit" class="coffee-add-options-button">만들기</button>
              </form>
            </div>
          </div>
        </div>
    <div class="modal-layout hidden">
    <div class="modal-header">
      <span><i id="close-icon" class="fa-solid fa-square-xmark fa-2xl"></i></span>
      <h1 class="selected-coffee-option"></h1>
    </div>
    <div class="modal-table-wrapper">
      <div class="modal-table">
        <div class="table-row header">
          <div class="cell">No</div>
          <div class="cell">메뉴명</div>
          <div class="cell">사이즈</div>
          <div class="cell">샷</div>
          <div class="cell">시럽</div>
          <div class="cell">ICE/HOT</div>
          <div class="cell">얼음 종류</div>
          <div class="cell">휘핑 크림</div>
          <div class="cell">엑스트라</div>
          <div class="cell">컵</div>
        </div>
{}
      </div>
    </div>
    <div class="modal-content">
      <form>
        <div class="modal-content-side">
          <div>
            <p>사이즈</p>
            <ul>
              <li>
                <input id="coffee-size-tall" type="radio" name="coffee-size" value="Tall" />
                <label for="coffee-size-tall">Tall</label>
              </li>
              <li>
                <input id="coffee-size-grande" type="radio" name="coffee-size" value="Grande" />
                <label for="coffee-size-grande">Grande</label>
              </li>
              <li>
                <input id="coffee-size-venti" type="radio" name="coffee-size" value="Venti" />
                <label for="coffee-size-venti">Venti</label>
              </li>
            </ul>
          </div>
          <div>
            <p>샷</p>
            <ul>
              <li>
                <input id="coffee-one-shot" type="radio" name="coffee-shot" value="One shot" />
                <label for="coffee-one-shot">1샷</label>
              </li>
              <li>
                <input id="coffee-two-shot" type="radio" name="coffee-shot" value="Two shot" checked />
                <label for="coffee-two-shot">2샷</label>
              </li>
              <li>
                <input id="coffee-three-shot" type="radio" name="coffee-shot" value="Three shot" />
                <label for="coffee-three-shot">3샷</label>
              </li>
            </ul>
          </div>
          <div>
            <p>시럽</p>
            <ul>
              <li>
                <input id="coffee-vanilla-syrup" type="radio" name="coffee-syrup" value="Vanilla" />
                <label for="coffee-vanilla-syrup">바닐라</label>
              </li>
              <li>
                <input id="coffee-hazelnut-syrup" type="radio" name="coffee-syrup" value="Hazelnut" />
                <label for="coffee-hazelnut-syrup">헤이즐넛</label>
              </li>
              <li>
                <input id="coffee-caramel-syrup" type="radio" name="coffee-syrup" value="Caramel" />
                <label for="coffee-caramel-syrup">카라멜</label>
              </li>
            </ul>
          </div>
          <div>
            <p>ICE/HOT</p>
            <ul>
              <li>
                <input id="ice-coffee" type="radio" name="coffee-ice-or-hot" value="Ice" />
                <label for="ice-coffee">ICE</label>
              </li>
              <li>
                <input id="hot-coffee" type="radio" name="coffee-ice-or-hot" value="Hot" />
                <label for="hot-coffee">HOT</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-content-side">
          <div>
            <p>얼음 종류</p>
            <ul>
              <li>
                <input id="coffee-ice-basic" type="radio" name="coffee-ice" value="Basic" />
                <label for="coffee-ice-basic">기본 얼음</label>
              </li>
              <li>
                <input id="coffee-ice-cube" type="radio" name="coffee-ice" value="Cube" />
                <label for="coffee-ice-cube">각 얼음</label>
              </li>
            </ul>
          </div>
          <div>
            <p>휘핑 크림</p>
            <ul>
              <li>
                <input id="coffee-none-whipped-cream" type="radio" name="coffee-whipped-cream" value="None" checked />
                <label for="coffee-none-whipped-cream">없음</label>
              </li>
              <li>
                <input id="coffee-fit-whipped-cream" type="radio" name="coffee-whipped-cream" value="Fit" />
                <label for="coffee-fit-whipped-cream">적당히</label>
              </li>
              <li>
                <input id="coffee-Many-whipped-cream" type="radio" name="coffee-whipped-cream" value="Many" />
                <label for="coffee-Many-whipped-cream">많이</label>
              </li>
            </ul>
          </div>
          <div>
            <p>엑스트라</p>
            <ul>
              <li>
                <input id="coffee-extra-java-chip" type="checkbox" />
                <label for="coffee-extra-java-chip">자바칩</label>
              </li>
              <li>
                <input id="coffee-extra-caramel-drizzle" type="checkbox" />
                <label for="coffee-extra-caramel-drizzle">카라멜 드리즐</label>
              </li>
              <li>
                <input id="coffee-extra-chocolate-drizzle" type="checkbox" />
                <label for="coffee-extra-chocolate-drizzle">초코 드리즐</label>
              </li>
              <li>
                <input id="coffee-extra-almond" type="checkbox" />
                <label for="coffee-extra-almond">아몬드</label>
              </li>
              <li>
                <input id="coffee-extra-cinnamomum" type="checkbox" />
                <label for="coffee-extra-cinnamomum">시나몬</label>
              </li>
            </ul>
          </div>
          <div>
            <p>컵</p>
            <ul>
              <li>
                <input id="coffee-disposable-cup" type="radio" name="coffee-cup" value="Disposable" />
                <label for="coffee-disposable-cup">1회용 컵</label>
              </li>
              <li>
                <input id="coffee-tumbler-cup" type="radio" name="coffee-cup" value="Tumbler" />
                <label for="coffee-tumbler-cup">텀블러</label>
              </li>
              <li>
                <input id="coffee-mug-cup" type="radio" name="coffee-cup" value="Mug" />
                <label for="coffee-mug-cup">머그컵</label>
              </li>
              <li>
                <input id="coffee-recycling-cup" type="radio" name="coffee-cup" value="Recycling" />
                <label for="coffee-recycling-cup">재활용 컵</label>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
    <div class="coffee-serve-area">
      <a href="#"><span>커피 서빙하기</span></a>
    </div>
  </div>`;
  }
}