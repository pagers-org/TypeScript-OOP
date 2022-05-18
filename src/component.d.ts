declare abstract class Component {
  abstract init(): void;
  abstract render(): void;
  abstract template(): string;
  abstract setState<T>(state: T): void;
  abstract setEvent(): void;
}
