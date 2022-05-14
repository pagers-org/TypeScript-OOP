import { emit, on } from '../utils/helpers.js';

export default class View {
  protected element;
  protected originalDisplay;
  constructor(element: any) {
    if (!element) throw 'no element';

    this.element = element;
    this.originalDisplay = this.element.style.display || '';

    return this;
  }

  hide() {
    this.element.style.display = 'none';
    return this;
  }

  show(): View {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  on(eventName: string, handler: any) {
    on(this.element, eventName, handler);
    return this;
  }

  emit(eventName: string, data: any) {
    emit(eventName, data);
    return this;
  }
}
