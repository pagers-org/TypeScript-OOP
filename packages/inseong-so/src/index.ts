let currentElement: HTMLButtonElement | null = null;
const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;

const changeCoffeeType = (selected: HTMLButtonElement) => {
  if (currentElement) {
    currentElement.classList.remove('selected');
    coffeeFilling.classList.remove(currentElement.id);
  }

  currentElement = selected;
  coffeeFilling.classList.add(currentElement.id);
  currentElement.classList.add('selected');
  coffeeName.innerText = selected.innerText;
};

buttons.forEach(button => button.addEventListener('click', () => changeCoffeeType(button)));
addCoffeeOptionsForm.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.modal-layout')?.classList.toggle('hidden');
});

(document.querySelector('.modal-layout') as HTMLDivElement)?.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  document.querySelector('.modal-layout')?.classList.toggle('hidden');
});
