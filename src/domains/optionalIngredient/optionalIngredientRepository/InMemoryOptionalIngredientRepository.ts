import { OptionalIngredientDTO } from '@/domains/optionalIngredient/optionalIngredientDTO';
import { SelectedOptionEntity } from 'entity';
import InMemoryRepository from '@/domains/core/InMemoryRepository';

export default class InMemoryOptionalIngredientRepository extends InMemoryRepository<OptionalIngredientDTO> {
  getSelectedAll() {
    return [...this._record.values()];
  }

  select(option: SelectedOptionEntity) {
    const optionalIngredientDTO = this.findById(option.type);
    return optionalIngredientDTO.select(option.selected);
  }
}
