export const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const findById = <T extends { id: number }>(arr: T[], id: number) => arr.find(v => v.id === id);

export const entries = <K extends string, V>(obj: Record<K, V>): [K, V][] => Object.entries(obj) as [K, V][];

export const keys = <K extends string, V>(obj: Record<K, V>): K[] => Object.keys(obj) as K[];
