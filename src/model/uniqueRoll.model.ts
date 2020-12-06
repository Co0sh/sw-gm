export interface UniqueRollKey extends String {
  __uniqueRollKey: never;
}

export const asUniqueRollKey = (key: string): UniqueRollKey => key as any;

export interface UniqueRoll {
  key: UniqueRollKey;
  result: number;
}
