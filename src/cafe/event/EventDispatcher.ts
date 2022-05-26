import { dispatchCustomEvent } from '@/common';
import {
  AfterServingDetail,
  BeforeServingDetail,
  MenuButtonClickDetail,
  ModalOpenDetail,
  OptionChangedDetail,
  OrderAddDetail,
  OrderRemovedDetail,
} from '@/@types';
import { Events } from '@/cafe';

export class EventDispatcher {
  public menuButtonClick(detail: MenuButtonClickDetail) {
    dispatchCustomEvent(Events.MENU_BUTTON_CLICK, detail);
  }

  public orderAdded(detail: OrderAddDetail) {
    dispatchCustomEvent(Events.ORDER_ADDED, detail);
  }

  public orderRemoved(detail: OrderRemovedDetail) {
    dispatchCustomEvent(Events.ORDER_REMOVED, detail);
  }

  public optionChanged(detail: OptionChangedDetail) {
    dispatchCustomEvent(Events.CHANGE_OPTION, detail);
  }

  public modalOpen(detail: ModalOpenDetail) {
    dispatchCustomEvent(Events.MODAL_OPEN, detail);
  }

  public beforeServing(detail: BeforeServingDetail) {
    dispatchCustomEvent(Events.BEFORE_SERVING, detail);
  }

  public afterServing(detail: AfterServingDetail) {
    dispatchCustomEvent(Events.AFTER_SERVING, detail);
  }
}
