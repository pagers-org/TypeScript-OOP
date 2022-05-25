import { Component } from '@/components';
import { MenuButtonView } from './MenuButtonView';
import { eventDispatcher } from '@/main';

const CLASS_NAME_SELECTED = 'selected';

export class MenuButton extends Component {
  private menuId!: number;
  private menuName!: string;

  public setMenuId(menuId: number) {
    this.menuId = menuId;
  }

  public setMenuName(menuName: string) {
    this.menuName = menuName;
  }

  protected bindEvents() {
    this.$container.addEventListener('click', () => {
      eventDispatcher.menuButtonClick({ button: this });
    });
  }

  public active() {
    this.$container.classList.add(CLASS_NAME_SELECTED);
  }

  public unActive(): void {
    this.$container.classList.remove(CLASS_NAME_SELECTED);
  }

  public getMenuId() {
    return this.menuId;
  }

  protected view(): string {
    return MenuButtonView(`${this.menuName}`);
  }
}
