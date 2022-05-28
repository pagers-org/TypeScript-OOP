declare abstract class Observable<T> {
  abstract subscribe(cb: ((v: T) => void) | Promise<(v: T) => void>): { unsubscribe: () => void };
  abstract next(args: T): void;
}

declare abstract class Subjectable<T> {
  abstract setSubject(subject: Subject<T>): Subject<T>;
}

declare abstract class Observer<T> {
  abstract observer(s: T): void;
}
