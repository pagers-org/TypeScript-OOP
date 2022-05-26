declare abstract class Observable {
  abstract subscribe<T>(cb: ((v: T) => void) | Promise<(v: T) => void>): { unsubscribe: () => void };
  abstract next(): void;
}
