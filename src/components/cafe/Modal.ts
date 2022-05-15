import { EVENT } from '@/constant';
import { Component } from '@/components';
import { addCustomEventListener } from '@/common';

const CLASS_NAME_HIDDEN = 'hidden';

export class Modal extends Component {
  private $closeButton!: HTMLElement;

  init() {
    this.$closeButton = this.$container.querySelector('#close-icon') as HTMLElement;
  }

  bindEvents() {
    addCustomEventListener(EVENT.ORDER_SUBMIT, () => {
      if (this.cafe.orders.isEmptyOrder()) {
        return alert('주문을 추가하세요');
      }

      this.show();
    });

    this.$closeButton.addEventListener('click', () => {
      this.hide();
    });
  }

  show(): void {
    this.$container.classList.remove(CLASS_NAME_HIDDEN);
  }

  hide(): void {
    this.$container.classList.add(CLASS_NAME_HIDDEN);
  }

  template() {
    return String.raw`
<div class="modal-layout hidden cafe-modal">
  <div class="modal-header">
    <span><i id="close-icon" class="fa-solid fa-square-xmark fa-2xl"></i></span>
    <h1>아메리카노 옵션</h1>
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
      <div class="table-row">
        <div class="cell" data-title="No">1</div>
        <div class="cell" data-title="메뉴명">아메리카노</div>
        <div class="cell" data-title="사이즈">Tall</div>
        <div class="cell" data-title="샷">2</div>
        <div class="cell" data-title="시럽">-</div>
        <div class="cell" data-title="ICE/HOT">ICE</div>
        <div class="cell" data-title="얼음 종류">각얼음</div>
        <div class="cell" data-title="휘핑 크림">-</div>
        <div class="cell" data-title="엑스트라">-</div>
        <div class="cell" data-title="컵">1회용 컵</div>
      </div>
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
</div>
    `;
  }
}
