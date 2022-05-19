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
  public menuButtonClick({ button }: MenuButtonClickDetail) {
    dispatchCustomEvent(Events.MENU_BUTTON_CLICK, { button });
  }

  public orderAdded({ order }: OrderAddDetail) {
    dispatchCustomEvent(Events.ORDER_ADDED, { order });
  }

  public orderRemoved({ order }: OrderRemovedDetail) {
    dispatchCustomEvent(Events.ORDER_REMOVED, { order });
  }

  public optionChanged({ order, groupName, value }: OptionChangedDetail) {
    dispatchCustomEvent(Events.CHANGE_OPTION, { order, groupName, value });
  }

  public modalOpen(opened: ModalOpenDetail) {
    dispatchCustomEvent(Events.MODAL_OPEN, { opened });
  }

  public beforeServing({ order, serving }: BeforeServingDetail) {
    dispatchCustomEvent(Events.BEFORE_SERVING, { order, serving });
  }

  public afterServing({ serving }: AfterServingDetail) {
    dispatchCustomEvent(Events.AFTER_SERVING, { serving });
  }
}
