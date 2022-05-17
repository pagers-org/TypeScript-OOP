export const EVENT = {
  /**
   * dispatchCustomEvent
   * @link Component.constructor
   */
  COMPONENT_INITIALIZE: 'Component.initialize',

  /**
   * dispatchCustomEvent
   * @link OrderList.addOrder
   *
   * addCustomEventListener
   * @link App.bindListeners
   * @link Menu.bindListeners
   */
  ORDER_ADDED: 'ORDER_ADDED',

  /**
   * dispatchCustomEvent
   * @link Modal.bindEvents
   * @link OrderListItem.removeOrder
   *
   * addCustomEventListener
   * @link Menu.bindListeners
   * @link App.bindListeners
   */
  ORDER_REMOVED: 'ORDER_REMOVED',

  /**
   * dispatchCustomEvent
   * @link OrderListItem.removeOrder
   *
   * addCustomEventListener
   * @link OrderList.bindListeners
   */
  ORDER_LIST_ITEM_REMOVED: 'ORDER_LIST_ITEM_REMOVED',

  /**
   * dispatchCustomEvent
   * @link Modal.bindEvents
   *
   * addCustomEventListener
   * @link App.bindListeners
   * @link OrderListItem.bindListeners
   */
  CHANGE_OPTION: 'CHANGE_OPTION',

  /**
   * dispatchCustomEvent
   * @link Modal.bindEvents
   *
   * addCustomEventListener
   * @link OrderList.bindListeners
   */
  SERVING: 'SERVING',

  /**
   * dispatchCustomEvent
   * @link Modal.bindEvents
   *
   * addCustomEventListener
   * @link App.bindListeners
   * @link Served.bindListeners
   */
  SERVED: 'SERVED',

  /**
   * dispatchCustomEvent
   * @link Modal.open
   * @link Modal.close
   *
   * addCustomEventListener
   * @link App.bindListeners
   */
  MODAL_OPEN: 'MODAL_OPEN',

  /**
   * dispatchCustomEvent
   * @link MenuButton.bindEvents
   *
   * addCustomEventListener
   * @link OrderList.bindListeners
   */
  MENU_BUTTON_CLICK: 'MENU_BUTTON_CLICK',
};
