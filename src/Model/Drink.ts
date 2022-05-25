class Drink {
  id: number;
  name: string;
  menuName: string;

  constructor({ id, name, menuName }: Drink) {
    this.id = id;
    this.name = name;
    this.menuName = menuName;
  }
}

export default Drink;
