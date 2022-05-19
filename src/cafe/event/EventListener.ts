import {
  AfterServingDetail,
  BeforeServingDetail,
  EventListenArg,
  MenuButtonClickDetail,
  ModalOpenDetail,
  OptionChangedDetail,
  OrderAddDetail,
  OrderRemovedDetail,
} from '@/@types';
import { addCustomEventListener } from '@/common';
import { EventName, Events } from '@/cafe';

export class EventListener {
  private listen<T>(name: EventName, callback: EventListenArg<T>) {
    addCustomEventListener(name, e => callback(e.detail));
    return this;
  }

  public orderRemoved(callback: EventListenArg<OrderRemovedDetail>) {
    return this.listen(Events.ORDER_REMOVED, callback);
  }

  public orderAdded(callback: EventListenArg<OrderAddDetail>) {
    return this.listen(Events.ORDER_ADDED, callback);
  }

  public changedOption(callback: EventListenArg<OptionChangedDetail>) {
    return this.listen(Events.CHANGE_OPTION, callback);
  }

  public beforeServing(callback: EventListenArg<BeforeServingDetail>) {
    return this.listen(Events.BEFORE_SERVING, callback);
  }

  public afterServing(callback: EventListenArg<AfterServingDetail>) {
    return this.listen(Events.AFTER_SERVING, callback);
  }

  public modalOpen(callback: EventListenArg<ModalOpenDetail>) {
    return this.listen(Events.MODAL_OPEN, callback);
  }

  public menuButtonClick(callback: EventListenArg<MenuButtonClickDetail>) {
    return this.listen(Events.MENU_BUTTON_CLICK, callback);
  }
}
