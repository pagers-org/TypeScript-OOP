export interface GetByName<T> {
  getByName: (name: string) => T | null;
}

/**
 * findBy -> error throw error
 * getBy -> item or null
 * */
export interface Repository<T> {
  getByIdOrNull: (id: string) => T | null;
  findById: (id: string) => T;
  add: (item: T) => void;
  remove: (item: T) => void;
  edit: (item: T) => void;
  getAll: () => T[];
}
