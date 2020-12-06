import { ThrowResult } from './throwResult.model';

export interface MultiThrowResultUUID extends String {
  __multiThrowResultUUID: never;
}

export const asMultiThrowResultUUID = (key: string): MultiThrowResultUUID =>
  key as any;

export interface MultiThrowResult {
  name: string;
  throwResults: ThrowResult[];
  isCriticalFail: boolean;
  uuid: MultiThrowResultUUID;
  date: number;
}
