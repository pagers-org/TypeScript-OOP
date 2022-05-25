export function getRandomElementInArray(array: any[]) {
  const length = array.length;
  const randomIndex = getRandomNumber(length);
  return array[randomIndex];
}

export function getRandomNumber(num: number) {
  return Math.floor(Math.random() * num);
}
