import { $, $all } from "../utils/dom";
import { OrderService } from "../services/order.service";
import { OrderView } from "../views/order.view";
import { CoffeeDTO } from "@/@types";
import { createRandomOrder } from "../utils/random";

export class OrderController {
  private coffeeIndex = 0;

  constructor(
    private orderService: OrderService,
    private orderView: OrderView
  ) {
    this.bindHeaderEvent();
    this.bindMakeCoffeeEvent();
    this.bindModalEvent();
    this.handleOrderCoffee();
    this.handleDeleteCoffee();
  }

  bindHeaderEvent() {
    const pageNav = $("header") as HTMLHeadElement;
    pageNav.addEventListener("click", (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;
      event.preventDefault();
      alert("아직 준비되지 않았네요🥺");
    });
  }
  bindMakeCoffeeEvent() {
    let currentElement: HTMLButtonElement | null = null;
    const buttons = $all<HTMLButtonElement>(".coffee-category-button");
    const coffeeFilling = $(".filling") as HTMLDivElement;
    const coffeeName = $(".coffee_name") as HTMLHeadingElement;
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
  bindModalEvent() {
    const addCoffeeOptionsForm = $(".coffee-add-area form") as HTMLFormElement;
    const modalLayout = $(".modal-layout") as HTMLDivElement;

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

  handleOrderCoffee() {
    const orderButton = $(".order-button") as HTMLButtonElement;
    orderButton.addEventListener("click", (event) => {
      event.preventDefault();
      const newCoffee: CoffeeDTO = createRandomOrder(this.coffeeIndex + 1);
      this.coffeeIndex++;
      this.orderService.addCoffee(newCoffee);
      this.orderView.createOrderRow(newCoffee);
    });
  }
  handleDeleteCoffee() {
    const orderTable = $("#order-table") as HTMLDivElement;
    orderTable.addEventListener("click", (event) => {
      event.preventDefault();
      const $target = event.target as HTMLElement;
      const deletedItem = $target.closest(".table-row") as HTMLDivElement;
      const id = deletedItem?.dataset.key;
      const IntegerId = parseInt(id!);
      this.orderService.deleteCoffee(IntegerId);
      this.orderView.deleteOrderRow(IntegerId);
    });
  }
}
