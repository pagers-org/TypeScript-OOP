export interface Storage {
  put(key: string, item: any): void;
  get(key: string, defaultValue?: any): any;
}

export class LocalStorage implements Storage {
  get(key: string, defaultValue = '{}'): any {
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return JSON.parse(item);
  }

  put(key: string, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }
}
