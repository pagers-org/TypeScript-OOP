import { getElementLength } from './dom';

export const getOrderRow = (orderItems: string[]) => {
  return `<div class="cell" data-title="No">${getElementLength('.ordered-item') + 1}</div>
                <div class="cell" data-title="메뉴명">${orderItems[0]}</div>
                <div class="cell" data-title="사이즈">${orderItems[1]}</div>
                <div class="cell" data-title="샷">${orderItems[2]}</div>
                <div class="cell" data-title="시럽">${orderItems[3]}</div>
                <div class="cell" data-title="ICE/HOT">${orderItems[4]}</div>
                <div class="cell" data-title="얼음 종류">${orderItems[5]}</div>
                <div class="cell" data-title="휘핑 크림">${orderItems[6]}</div>
                <div class="cell" data-title="엑스트라">${orderItems[7]}</div>
                <div class="cell" data-title="컵">${orderItems[8]}</div>
                <div class="cell" data-title="수정하기">
                  <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
                </div>
                <div class="cell" data-title="삭제하기">
                  <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
                </div>
              `;
};

export const KITCHEN_TEMPLATE = `
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
        </div>`;

export const EMPTY_KITCHEN_TEMPLATE = `<div id="none-order">`;
