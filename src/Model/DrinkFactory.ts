import Drink, { DrinkList, Drinks } from '@/Model/Drink';
import Option from '@/Model/Option';

class DrinkFactory {
  private selectRandomDrink() {
    return Drinks[Math.floor(Math.random() * Drinks.length)];
  }

  createDrink(type?: DrinkList): Drink {
    switch (type) {
      case '아메리카노':
        return this.createAmericano();
      case '카페라떼':
        return this.createCafeLatte();
      case '카페모카':
        return this.createCafeMocha();
      default:
        return this.createDrink(this.selectRandomDrink());
    }
  }

  private createAmericano() {
    return new Drink({ name: '아메리카노', options: [
      new Option({
        name: '사이즈',
        selections: ['Tall', 'Grande', 'Venti'],
        selectedIndex: 1,
        type: 'radio',
      }),
      new Option({
        name: '샷',
        selections: ['1', '2', '3'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '시럽',
        selections: ['-', '1', '2'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: 'ICE/HOT',
        selections: ['ICE', 'HOT'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '얼음종류',
        selections: ['각얼음', '간얼음'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '휘핑크림',
        selections: ['-', '넣음'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '엑스트라',
        selections: ['-'],
        selectedIndex: 0,
        type: 'checkbox',
      }),
      new Option({
        name: '컵',
        selections: ['1회용 컵', '다회용 컵', '개인 컵'],
        selectedIndex: 0,
        type: 'radio',
      }),
    ]});
  }

  private createCafeLatte() {
    return new Drink({ name: '카페라떼', options: [
      new Option({
        name: '사이즈',
        selections: ['Tall', 'Grande', 'Venti'],
        selectedIndex: 1,
        type: 'radio',
      }),
      new Option({
        name: '샷',
        selections: ['1', '2', '3'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '시럽',
        selections: ['-', '1', '2'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: 'ICE/HOT',
        selections: ['ICE', 'HOT'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '얼음종류',
        selections: ['각얼음', '간얼음'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '휘핑크림',
        selections: ['-', '넣음'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '엑스트라',
        selections: ['-'],
        selectedIndex: 0,
        type: 'checkbox',
      }),
      new Option({
        name: '컵',
        selections: ['1회용 컵', '다회용 컵', '개인 컵'],
        selectedIndex: 0,
        type: 'radio',
      }),
    ]});
  }

  private createCafeMocha() {
    return new Drink({ name: '카페모카', options: [
      new Option({
        name: '사이즈',
        selections: ['Tall', 'Grande', 'Venti'],
        selectedIndex: 1,
        type: 'radio',
      }),
      new Option({
        name: '샷',
        selections: ['1', '2', '3'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '시럽',
        selections: ['-', '1', '2'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: 'ICE/HOT',
        selections: ['ICE', 'HOT'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '얼음종류',
        selections: ['각얼음', '간얼음'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '휘핑크림',
        selections: ['-', '넣음'],
        selectedIndex: 0,
        type: 'radio',
      }),
      new Option({
        name: '엑스트라',
        selections: ['-'],
        selectedIndex: 0,
        type: 'checkbox',
      }),
      new Option({
        name: '컵',
        selections: ['1회용 컵', '다회용 컵', '개인 컵'],
        selectedIndex: 0,
        type: 'radio',
      }),
    ]});
  }
}

export default new DrinkFactory();
