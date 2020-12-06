import { v4 } from 'uuid';
import { Die } from './die';
import { getKey } from './key';

export type ThrowType = 'regular' | 'wild';

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

export interface UniqueDieKey extends String {
  __uniqueDieKey: never;
}

export const asUniqueDieKey = (key: string): UniqueDieKey => key as any;

export interface UniqueDie {
  key: UniqueDieKey;
  sides: Die;
}

export interface MultiThrowOptions {
  name: string;
  throws: ThrowOptions[];
  acing: boolean;
  canFail: boolean;
  globalTarget: number;
  globalModifier: number;
}

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

export interface UniqueRollKey extends String {
  __uniqueRollKey: never;
}

export const asUniqueRollKey = (key: string): UniqueRollKey => key as any;

export interface UniqueRoll {
  key: UniqueRollKey;
  result: number;
}

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

export type RollFn = (dice: Die) => number;

export const roll: RollFn = (die: Die): number => {
  return Math.floor(Math.random() * die) + 1;
};

export const defaultTarget: number = 4;

export const defaultModifier: number = 0;

export const defaultRegularDie: Die = 4;

export const defaultWildDie: Die = 6;

export const defaultMultiThrowName = 'Custom';

export const defaultThrowName = 'Regular';

export const defaultWildThrowName = 'Wild Die';

export const defaultRegularThrow: ThrowOptions = {
  key: getKey(),
  name: `${defaultThrowName} 1`,
  type: 'regular',
  dice: [{ key: getKey(), sides: defaultRegularDie }],
  target: defaultTarget,
  modifier: defaultModifier,
};

export const defaultWildThrow: ThrowOptions = {
  key: getKey(),
  name: defaultWildThrowName,
  type: 'wild',
  dice: [{ key: getKey(), sides: defaultWildDie }],
  target: defaultTarget,
  modifier: defaultModifier,
};

export const defaultDiceOptions: MultiThrowOptions = {
  name: defaultMultiThrowName,
  throws: [defaultRegularThrow, defaultWildThrow],
  acing: true,
  canFail: true,
  globalModifier: defaultModifier,
  globalTarget: defaultTarget,
};

export const generateThrowDice = (rollFn: RollFn) => (
  options: Partial<MultiThrowOptions> = {},
): MultiThrowResult => {
  const { throws, acing, canFail, name } = {
    ...defaultDiceOptions,
    ...options,
  };

  const uuid = asMultiThrowResultUUID(v4());

  const chosenRollFn = acing ? ace(rollFn) : notAce(rollFn);

  const resolveThrow = (
    aThrow: ThrowOptions,
    index: number | null,
    isAdditional = false,
  ): ThrowResult => {
    const { dice, type, target, modifier, name } = aThrow;
    const multiRolls = dice.map((die) => chosenRollFn(die.sides));
    return {
      key: getKey(),
      name,
      multiRolls,
      type,
      target,
      modifier,
      isAdditional,
    };
  };

  const throwResults = throws.map((aThrow, index) =>
    resolveThrow(aThrow, index),
  );

  const getThrowSum = (throwResult: ThrowResult) =>
    throwResult.multiRolls.reduce((acc, next) => acc + next.sum, 0);

  const getCriticalFailure = (
    throwResults: ThrowResult[],
  ): { isCriticalFail: boolean; additionalWildThrows: ThrowResult[] } => {
    const wildThrow = throwResults.find(
      (throwResult) => throwResult.type === 'wild',
    );
    const allSums = throwResults.map(getThrowSum);
    const fails = allSums.filter((s) => s === 1).length;
    const isFailed = fails > allSums.length / 2;

    if (isFailed) {
      const backupWildThrow =
        wildThrow ?? resolveThrow(defaultWildThrow, null, true);
      const wildThrowSum = getThrowSum(backupWildThrow);

      return {
        isCriticalFail: wildThrowSum === 1,
        additionalWildThrows: wildThrow ? [] : [backupWildThrow],
      };
    }

    return {
      isCriticalFail: false,
      additionalWildThrows: [],
    };
  };

  const { isCriticalFail, additionalWildThrows } = canFail
    ? getCriticalFailure(throwResults)
    : { isCriticalFail: false, additionalWildThrows: [] };

  return {
    name,
    throwResults: [...throwResults, ...additionalWildThrows],
    isCriticalFail,
    uuid,
    date: new Date().getTime(),
  };
};

export const throwDice = generateThrowDice(roll);

export const notAce = (rollFn: RollFn) => (die: Die): MultiRollResult => {
  const result = rollFn(die);
  return {
    key: getKey(),
    die,
    rolls: [{ key: getKey(), result }],
    sum: result,
  };
};

export const ace = (rollFn: RollFn) => (die: Die): MultiRollResult => {
  const rolls: UniqueRoll[] = [];
  let result;
  do {
    result = rollFn(die);
    rolls.push({ key: getKey(), result });
  } while (result === die);
  return {
    key: getKey(),
    die,
    rolls,
    sum: rolls.reduce((acc, next) => acc + next.result, 0),
  };
};
