import { Die } from './die.model';

export interface UniqueDieKey extends String {
  __uniqueDieKey: never;
}

export const asUniqueDieKey = (key: string): UniqueDieKey => key as any;

export interface UniqueDie {
  key: UniqueDieKey;
  sides: Die;
}
