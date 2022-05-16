import { $, $all } from "../utils/dom";

export class OrderService {
  constructor() {
    
  }
  bindEvent() {
    this.bindHeaderEvent();
    this.bindMakeCoffeeEvent();
    this.bindModalEvent();
  }
  private bindHeaderEvent() {
    const pageNav = $("header") as HTMLHeadElement;
    pageNav.addEventListener("click", (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;
      event.preventDefault();
      alert("아직 준비되지 않았네요🥺");
    });
  }
  private bindMakeCoffeeEvent() {
    let currentElement: HTMLButtonElement | null = null;
    const buttons = $all<HTMLButtonElement>(".coffee-category-button");
    const coffeeFilling = $(".filling") as HTMLDivElement;
    const coffeeName = $(
      ".coffee_name"
    ) as HTMLHeadingElement;
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        if (currentElement) {
          currentElement.classList.remove("selected");
          coffeeFilling.classList.remove(currentElement.id);
        }

        currentElement = button;
        coffeeFilling.classList.add(currentElement.id);
        currentElement.classList.add("selected");
        coffeeName.innerText = button.innerText;
      })
    );
  }
  private bindModalEvent() {
    const addCoffeeOptionsForm = $(
      ".coffee-add-area form"
    ) as HTMLFormElement;
    const modalLayout = $(
      ".modal-layout"
    ) as HTMLDivElement;

    addCoffeeOptionsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      modalLayout.classList.toggle("hidden");
    });
    modalLayout.addEventListener("click", (event: MouseEvent) => {
      const $target = event.target as HTMLElement;
      if (!$target.matches("#close-icon")) return;
      modalLayout.classList.toggle("hidden");
    });
  }
}