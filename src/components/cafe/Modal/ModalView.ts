import { Order } from '@/domain';

export const ModalView = (order: Order) => String.raw`
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
      <div class="table-row order-info">
        <div class="cell" data-title="No">1</div>
        <div class="cell" data-title="메뉴명">${order.getBeverageName()}</div>
        <div class="cell" data-title="사이즈"></div>
        <div class="cell" data-title="샷"></div>
        <div class="cell" data-title="시럽"></div>
        <div class="cell" data-title="ICE/HOT"></div>
        <div class="cell" data-title="얼음 종류"></div>
        <div class="cell" data-title="휘핑 크림"></div>
        <div class="cell" data-title="엑스트라"></div>
        <div class="cell" data-title="컵"></div>
      </div>
    </div>
  </div>
  <div class="modal-content">
    <form>
      <div class="modal-content-side">
        <div class='option-group' data-group-name='사이즈'>
          <p>사이즈</p>
          <ul>
            <li>
              <input id="coffee-size-tall" 
                      type="radio" 
                      name="coffee-size" 
                      value="Tall" 
                      ${order.isSelectedOptionEquals('사이즈', 'Tall') ? 'checked' : ''} />
              <label for="coffee-size-tall">Tall</label>
            </li>
            <li>
              <input id="coffee-size-grande" type="radio" name="coffee-size" value="Grande" 
              ${order.isSelectedOptionEquals('사이즈', 'Grande') ? 'checked' : ''} />
              <label for="coffee-size-grande">Grande</label>
            </li>
            <li>
              <input id="coffee-size-venti" type="radio" name="coffee-size" value="Venti" 
              ${order.isSelectedOptionEquals('사이즈', 'Venti') ? 'checked' : ''} />
              <label for="coffee-size-venti">Venti</label>
            </li>
          </ul>
        </div>
        <div class='option-group' data-group-name='샷'>
          <p>샷</p>
          <ul>
            <li>
              <input id="coffee-one-shot" type="radio" name="coffee-shot" value="1샷" 
              ${order.isSelectedOptionEquals('샷', '1샷') ? 'checked' : ''}/>
              <label for="coffee-one-shot">1샷</label>
            </li>
            <li>
              <input id="coffee-two-shot" type="radio" name="coffee-shot" value="2샷" 
               ${order.isSelectedOptionEquals('샷', '2샷') ? 'checked' : ''}/>
              <label for="coffee-two-shot">2샷</label>
            </li>
            <li>
              <input id="coffee-three-shot" type="radio" name="coffee-shot" value="3샷" 
              ${order.isSelectedOptionEquals('샷', '3샷') ? 'checked' : ''}/>
              <label for="coffee-three-shot">3샷</label>
            </li>
          </ul>
        </div>
        <div class='option-group' data-group-name='시럽'>
          <p>시럽</p>
          <ul>
            <li>
              <input id="coffee-vanilla-syrup" type="radio" name="coffee-syrup" value="바닐라" 
              ${order.isSelectedOptionEquals('시럽', '바닐라') ? 'checked' : ''}/>
              <label for="coffee-vanilla-syrup">바닐라</label>
            </li>
            <li>
              <input id="coffee-hazelnut-syrup" type="radio" name="coffee-syrup" value="헤이즐넛" 
              ${order.isSelectedOptionEquals('시럽', '헤이즐넛') ? 'checked' : ''}/>
              <label for="coffee-hazelnut-syrup">헤이즐넛</label>
            </li>
            <li>
              <input id="coffee-caramel-syrup" type="radio" name="coffee-syrup" value="카라멜" 
              ${order.isSelectedOptionEquals('시럽', '카라멜') ? 'checked' : ''}/>
              <label for="coffee-caramel-syrup">카라멜</label>
            </li>
          </ul>
        </div>
        <div class='option-group' data-group-name='ICE/HOT'>
          <p>ICE/HOT</p>
          <ul>
            <li>
              <input id="ice-coffee" type="radio" name="coffee-ice-or-hot" value="ICE" 
              ${order.isSelectedOptionEquals('ICE/HOT', 'ICE') ? 'checked' : ''}/>
              <label for="ice-coffee">ICE</label>
            </li>
            <li>
              <input id="hot-coffee" type="radio" name="coffee-ice-or-hot" value="HOT" 
              ${order.isSelectedOptionEquals('ICE/HOT', 'HOT') ? 'checked' : ''}/>
              <label for="hot-coffee">HOT</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-content-side">
        <div class='option-group' data-group-name='얼음 종류'>
          <p>얼음 종류</p>
          <ul>
            <li>
              <input id="coffee-ice-basic" type="radio" name="coffee-ice" value="기본 얼음" 
              ${order.isSelectedOptionEquals('얼음 종류', '기본 얼음') ? 'checked' : ''}/>
              <label for="coffee-ice-basic">기본 얼음</label>
            </li>
            <li>
              <input id="coffee-ice-cube" type="radio" name="coffee-ice" value="각 얼음" 
              ${order.isSelectedOptionEquals('얼음 종류', '각 얼음') ? 'checked' : ''}/>
              <label for="coffee-ice-cube">각 얼음</label>
            </li>
          </ul>
        </div>
        <div class='option-group' data-group-name='휘핑 크림'>
          <p>휘핑 크림</p>
          <ul>
            <li>
              <input id="coffee-none-whipped-cream" type="radio" name="coffee-whipped-cream" value="없음" 
               ${order.isSelectedOptionEquals('휘핑 크림', '없음') ? 'checked' : ''}/>
              <label for="coffee-none-whipped-cream">없음</label>
            </li>
            <li>
              <input id="coffee-fit-whipped-cream" type="radio" name="coffee-whipped-cream" value="적당히"
               ${order.isSelectedOptionEquals('휘핑 크림', '적당히') ? 'checked' : ''}/>
              <label for="coffee-fit-whipped-cream">적당히</label>
            </li>
            <li>
              <input id="coffee-Many-whipped-cream" type="radio" name="coffee-whipped-cream" value="많이"
               ${order.isSelectedOptionEquals('휘핑 크림', '많이') ? 'checked' : ''}/>
              <label for="coffee-Many-whipped-cream">많이</label>
            </li>
          </ul>
        </div>
        <div class='option-group' data-group-name='엑스트라'>
          <p>엑스트라</p>
          <ul>
            <li>
              <input id="coffee-extra-java-chip" type="checkbox" value='자바칩'
              ${order.isSelectedOptionEquals('엑스트라', '자바칩') ? 'checked' : ''}/>
              <label for="coffee-extra-java-chip">자바칩</label>
            </li>
            <li>
              <input id="coffee-extra-caramel-drizzle" type="checkbox" value='카라멜 드리즐'
              ${order.isSelectedOptionEquals('엑스트라', '카라멜 드리즐') ? 'checked' : ''}/>
              <label for="coffee-extra-caramel-drizzle">카라멜 드리즐</label>
            </li>
            <li>
              <input id="coffee-extra-chocolate-drizzle" type="checkbox" value='초코 드리즐'
               ${order.isSelectedOptionEquals('엑스트라', '초코 드리즐') ? 'checked' : ''}/>
              <label for="coffee-extra-chocolate-drizzle">초코 드리즐</label>
            </li>
            <li>
              <input id="coffee-extra-almond" type="checkbox" value='아몬드'
              ${order.isSelectedOptionEquals('엑스트라', '아몬드') ? 'checked' : ''}/>
              <label for="coffee-extra-almond">아몬드</label>
            </li>
            <li>
              <input id="coffee-extra-cinnamomum" type="checkbox" value='시나몬'
               ${order.isSelectedOptionEquals('엑스트라', '시나몬') ? 'checked' : ''}/>
              <label for="coffee-extra-cinnamomum">시나몬</label>
            </li>
          </ul>
        </div>
        <div class='option-group' data-group-name='컵'>
          <p>컵</p>
          <ul>
            <li>
              <input id="coffee-disposable-cup" type="radio" name="coffee-cup" value="1회용 컵" 
              ${order.isSelectedOptionEquals('컵', '1회용 컵') ? 'checked' : ''}/>
              <label for="coffee-disposable-cup">1회용 컵</label>
            </li>
            <li>
              <input id="coffee-tumbler-cup" type="radio" name="coffee-cup" value="텀블러" 
              ${order.isSelectedOptionEquals('컵', '텀블러') ? 'checked' : ''}/>
              <label for="coffee-tumbler-cup">텀블러</label>
            </li>
            <li>
              <input id="coffee-mug-cup" type="radio" name="coffee-cup" value="머그컵" 
              ${order.isSelectedOptionEquals('컵', '머그컵') ? 'checked' : ''}/>
              <label for="coffee-mug-cup">머그컵</label>
            </li>
            <li>
              <input id="coffee-recycling-cup" type="radio" name="coffee-cup" value="재활용 컵" 
              ${order.isSelectedOptionEquals('컵', '재활용 컵') ? 'checked' : ''}/>
              <label for="coffee-recycling-cup">재활용 컵</label>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
  <div class="coffee-serve-area">
    <a href="#" class='serving-button'><span>커피 서빙하기</span></a>
  </div>
</div>`;
