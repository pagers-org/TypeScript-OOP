export const getRandomInt = (coffeeOptionsList: string[]) => {
  return Math.floor(Math.random() * coffeeOptionsList.length);
};
