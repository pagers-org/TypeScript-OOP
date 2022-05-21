abstract class Component {
  protected $root: HTMLElement;

  constructor($root: HTMLElement | null) {
    if (!$root) throw new Error('root element is required to render');
    this.$root = $root;
    this.init();
  }

  abstract init(): void;
  abstract render(): void;
  abstract template(): string;
  abstract setState<T>(state: T): void;
  abstract setEvent(): void;
}

export default Component;
