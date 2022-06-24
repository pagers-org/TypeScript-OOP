import { MenuEntity, OptionalIngredientEntity, OrderEntity } from 'entity';
import { choiceRandomOne, getRandomLessThanLength } from '@/utils';
import { MENUS, OPTIONAL_INGREDIENTS } from '@/constants';
import { OptionalIngredientDTO } from '@/domains/optionalIngredient/optionalIngredientDTO';
import { v4 as uuidv4 } from 'uuid';

let _orderNo = 1;
/**
 * orderNo 라는 인자를 기준으로 분기가 되는 로직은 죄악이지만 일단은........임시로 두기
 * */
export const createRandomOrderEntity = (orderNo?: number) => {
  const randomMenu: MenuEntity = choiceRandomOne(MENUS);
  const randomCnt = getRandomLessThanLength(OPTIONAL_INGREDIENTS);
  const randomExtraOptions: OptionalIngredientEntity[] = Array(randomCnt)
    .fill(null)
    .map(() => {
      const ingredient = new OptionalIngredientDTO(choiceRandomOne(OPTIONAL_INGREDIENTS));
      const randomSelected = choiceRandomOne(ingredient.getSelectableList());

      ingredient.select(randomSelected);
      return ingredient.toEntity();
    });
  const order: OrderEntity = {
    menu: randomMenu,
    optionalIngredients: randomExtraOptions,
    orderNo: orderNo && orderNo > 0 ? orderNo : _orderNo++,
    id: uuidv4(),
    state: 'preparing',
  };
  return order;
};
