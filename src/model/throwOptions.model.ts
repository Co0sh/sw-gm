import { ThrowType } from './throwType.model';
import { UniqueDie } from './uniqueDie.model';

export interface ThrowOptionsKey extends String {
  __throwOptionsKey: never;
}

export const asThrowOptionsKey = (key: string): ThrowOptionsKey => key as any;

export interface ThrowOptions {
  key: ThrowOptionsKey;
  name: string;
  type: ThrowType;
  dice: UniqueDie[];
  target: number;
  modifier: number;
}
