import { GetByName, Repository } from '@/domains/core/type';
import OrderDTO from '@/domains/order/OrderDTO';
import { createDom } from '@/utils';
import EventBus from '@/domains/core/EventBus';
import { EVENTS } from '@/constants';

let _$target: Element | null = null;
const KitchenUI = ({
  $target,
  orderRepository,
}: {
  $target: Element | null;
  orderRepository: Repository<OrderDTO> & GetByName<OrderDTO>;
}) => {
  if (!$target) {
    throw new Error('타겟 필요');
  }
  _$target = $target; // class로 관리하기
  const template = () => {
    if (orderRepository.getAll().length === 0) {
      return `
        <div data-component="kitchenUI" style="all:inherit; width: 100%" >
            <div id="none-order"></div>
        </div>
    `;
    } else {
      return `
        <div data-component="kitchenUI" style="all:inherit; width: 100%" >
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
              <button class="coffee-category-button" ${orderRepository.getByName('아메리카노') ? '' : 'disabled'}
               id="americano">아메리카노</button>
              <button class="coffee-category-button" ${orderRepository.getByName('카페오레') ? '' : 'disabled'}
               id="au_lait">카페 오레</button>
              <button class="coffee-category-button" ${orderRepository.getByName('카푸치노') ? '' : 'disabled'}
               id="capuccino">카푸치노</button>
              <button class="coffee-category-button" ${orderRepository.getByName('코레또') ? '' : 'disabled'}
               id="corretto">코레또</button>
              <button class="coffee-category-button" ${orderRepository.getByName('에스프레소') ? '' : 'disabled'}
               id="espresso">에스프레소</button>
            </div>
            <div>
              <button class="coffee-category-button" ${orderRepository.getByName('카페라떼') ? '' : 'disabled'}
               id="latte">카페 라떼</button>
              <button class="coffee-category-button" ${orderRepository.getByName('룽고') ? '' : 'disabled'}
               id="lungo">룽고</button>
              <button class="coffee-category-button" ${orderRepository.getByName('마끼야또') ? '' : 'disabled'}
               id="macchiato">마끼야또</button>
              <button class="coffee-category-button" ${orderRepository.getByName('카페모카') ? '' : 'disabled'}
               id="mocha">카페 모카</button>
              <button class="coffee-category-button" ${orderRepository.getByName('리스트레또') ? '' : 'disabled'}
               id="ristretto">리스트레또</button>
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
        </div>
      </div>
      `;
    }
  };

  const render = () => {
    const newDom = createDom(template());
    _$target?.replaceWith(newDom);
    _$target = newDom;

    // 기존 event 복붙
    const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;
    const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
    const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;
    const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
    let currentElement: HTMLButtonElement | null = null;

    const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
    buttons.forEach(button =>
      button.addEventListener('click', () => {
        if (currentElement) {
          currentElement.classList.remove('selected');
          coffeeFilling.classList.remove(currentElement.id);
        }

        currentElement = button;
        coffeeFilling.classList.add(currentElement.id);
        currentElement.classList.add('selected');
        coffeeName.innerText = button.innerText;
      }),
    );

    addCoffeeOptionsForm?.addEventListener('submit', event => {
      event.preventDefault();
      modalLayout.classList.toggle('hidden');
    });
  };

  // re render 상황
  EventBus.on(EVENTS.createOrder.completed, render);
  EventBus.on(EVENTS.deleteOrder.completed, render);
  EventBus.on(EVENTS.editOrder.completed, render);

  render();
};

export default KitchenUI;
