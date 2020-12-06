import { ThrowOptions } from './throwOptions.model';

export interface MultiThrowOptions {
  name: string;
  throwNameTemplate: string;
  throws: ThrowOptions[];
  acing: boolean;
  canFail: boolean;
  globalTarget: number;
  globalModifier: number;
}
