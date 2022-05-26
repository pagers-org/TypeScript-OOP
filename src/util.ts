export const getRandomItem = (inventory: string[]) => {
  return inventory[getRandomNumber(inventory.length)];
};

export const getRandomNumber = (range: number) => {
  return Math.floor(Math.random() * range);
};
