export const template = String.raw`
<header>
  <h1>☕ OOP 카페 ☕</h1>
  <nav>
    <input type="radio" name="tab" id="order-management" checked />
    <input type="radio" name="tab" id="material-management" />
    <label class="order-management" for="order-management"><i class="fa-solid fa-mug-hot"></i>&nbsp;주문 관리</label>
    <label class="material-management" for="material-management"><i class="fas fa-blender"></i>&nbsp;재료 관리</label>
    <span class="tab"></span>
  </nav>
</header>
    `;
