class EventBus {
  // any 대신 다른 타입을 쓰고싶은데... 아무타입이나 받을 수 있으면서 any가 아닌 타입으로 쓸 수 있을까요?
  // never랑 unknown이 키워드로 나오긴 하는데 이해가 잘 안돼여...ㅠㅠ
  private listenerMap: Map<string, ((arg: any) => void)[]> = new Map<string, ((arg: any) => void)[]>();

  on<T>(eventType: string, listener: (arg: T) => void) {
    if (this.listenerMap.has(eventType)) {
      const listeners = this.listenerMap.get(eventType);
      if (!listeners) {
        throw new Error('타입 에러 헤소룰 위한 가드');
      }
      listeners.push(listener);
      this.listenerMap.set(eventType, listeners);
    } else {
      this.listenerMap.set(eventType, [listener]);
    }
  }
  emit<T>(eventType: string, arg: T = {} as T) {
    if (!this.listenerMap.has(eventType)) {
      return;
    }
    const listeners = this.listenerMap.get(eventType);
    if (!listeners) {
      return;
    }
    listeners.forEach(listener => listener(arg));
  }
}

export default new EventBus();
