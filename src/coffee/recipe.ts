import { Ingredient } from '@/@types';

const americano: Ingredient = {
  water: 6,
  coffee: 4,
};

const au_lait: Ingredient = {
  milk: 5,
  coffee: 5,
};

const capuccino: Ingredient = {
  coffee: 3.5,
  hot_milk: 3,
  milk_foam: 3.5,
};
const corretto: Ingredient = {
  coffee: 5.5,
  liqur: 2,
};

const espresso: Ingredient = {
  coffee: 4,
};

const latte: Ingredient = {
  coffee: 4,
  hot_milk: 4,
  milk_foam: 2,
};

const lungo: Ingredient = {
  coffee: 5,
  water: 5,
};
const macchiato: Ingredient = {
  coffee: 3,
  milk_foam: 7,
};
const mocha: Ingredient = {
  coffee: 4,
  chocolate: 2,
  hot_milk: 2,
  cream: 2,
};

const ristretto: Ingredient = {
  coffee: 2,
};
export { americano, au_lait, capuccino, corretto, espresso, latte, lungo, macchiato, mocha, ristretto };
