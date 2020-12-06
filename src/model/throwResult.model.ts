import { MultiRollResult } from './multiRollResult.model';
import { ThrowType } from './throwType.model';

export interface ThrowResultKey extends String {
  __throwResultKey: never;
}

export const asThrowResultKey = (key: string): ThrowResultKey => key as any;

export interface ThrowResult {
  key: ThrowResultKey;
  name: string;
  multiRolls: MultiRollResult[];
  type: ThrowType;
  target: number;
  modifier: number;
  isAdditional: boolean;
}
