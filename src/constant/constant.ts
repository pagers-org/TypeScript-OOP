export const EVENT = {
  /**
   * 컴포넌트의 생성자에서 호출됨
   *
   * Dispatch
   * @link Component.constructor
   *
   * Listener
   * @link App.bindListeners
   */
  COMPONENT_INITIALIZE: 'Component.initialize',

  /**
   * 주문이 추가되었을때
   *
   * Dispatch
   * @link OrderList.addOrder
   *
   * Listener
   * @link App.bindListeners
   * @link Menu.bindListeners
   */
  ORDER_ADDED: 'ORDER_ADDED',

  /**
   * 주문이 삭제되었을 때
   *
   * Dispatch
   * @link Modal.bindEvents
   * @link OrderListItem.removeOrder
   *
   * Listener
   * @link Menu.bindListeners
   * @link App.bindListeners
   */
  ORDER_REMOVED: 'ORDER_REMOVED',

  /**
   * 주문목록에서 주문이 삭제되었을 때
   *
   * Dispatch
   * @link OrderListItem.removeOrder
   *
   * Listener
   * @link OrderList.bindListeners
   */
  ORDER_LIST_ITEM_REMOVED: 'ORDER_LIST_ITEM_REMOVED',

  /**
   * 모달에서 옵션이 변경되었을 때
   *
   * Dispatch
   * @link Modal.bindEvents
   *
   * Listener
   * @link App.bindListeners
   * @link OrderListItem.bindListeners
   */
  CHANGE_OPTION: 'CHANGE_OPTION',

  /**
   * 모달에서 서빙이 끝나고 모달이 닫히기 전
   *
   * Dispatch
   * @link Modal.bindEvents
   *
   * Listener
   * @link OrderList.bindListeners
   */
  SERVING: 'SERVING',

  /**
   * 모달에서 서빙이 끝나고 모달이 닫힌 후
   *
   * Dispatch
   * @link Modal.bindEvents
   *
   * Listener
   * @link App.bindListeners
   * @link Served.bindListeners
   */
  SERVED: 'SERVED',

  /**
   * 모달이 열렸거나 닫힐때
   *
   * Dispatch
   * @link Modal.open
   * @link Modal.close
   *
   * Listener
   * @link App.bindListeners
   */
  MODAL_OPEN: 'MODAL_OPEN',

  /**
   * 메뉴에 있는 버튼을 클릭 했을때
   *
   * Dispatch
   * @link MenuButton.bindEvents
   *
   * Listener
   * @link OrderList.bindListeners
   */
  MENU_BUTTON_CLICK: 'MENU_BUTTON_CLICK',
};
