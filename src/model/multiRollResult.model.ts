import { Die } from './die.model';
import { UniqueRoll } from '../model/uniqueRoll.model';

export interface MultiRollResulttKey extends String {
  __multiRollResulttKey: never;
}

export const asMultiRollResulttKey = (key: string): MultiRollResulttKey =>
  key as any;

export interface MultiRollResult {
  key: MultiRollResulttKey;
  die: Die;
  rolls: UniqueRoll[];
  sum: number;
}
