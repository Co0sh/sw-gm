import { v4 } from 'uuid';
import { Die } from './die';

export type ThrowType = 'regular' | 'wild';

export interface ThrowOptions {
  type: ThrowType;
  dice: Die[];
  target: number;
  modifier: number;
}

export interface MultiThrowOptions {
  throws: ThrowOptions[];
  acing: boolean;
  canFail: boolean;
}

export interface MultiThrowResult {
  throwResults: ThrowResult[];
  isCriticalFail: boolean;
  uuid: string;
}

export interface ThrowResult {
  multiRolls: MultiRollResult[];
  type: ThrowType;
  target: number;
  modifier: number;
  isAdditional: boolean;
}

export interface MultiRollResult {
  die: Die;
  rolls: number[];
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

export const defaultRegularThrow: ThrowOptions = {
  type: 'regular',
  dice: [defaultRegularDie],
  target: defaultTarget,
  modifier: defaultModifier,
};

export const defaultWildThrow: ThrowOptions = {
  type: 'wild',
  dice: [defaultWildDie],
  target: defaultTarget,
  modifier: defaultModifier,
};

export const defaultDiceOptions: MultiThrowOptions = {
  throws: [defaultRegularThrow, defaultWildThrow],
  acing: true,
  canFail: true,
};

export const generateThrowDice = (rollFn: RollFn) => (
  options: Partial<MultiThrowOptions> = {},
): MultiThrowResult => {
  const { throws, acing, canFail } = {
    ...defaultDiceOptions,
    ...options,
  };

  const uuid = v4();

  const chosenRollFn = acing ? ace(rollFn) : notAce(rollFn);

  const resolveThrow = (
    aThrow: ThrowOptions,
    isAdditional = false,
  ): ThrowResult => {
    const { dice, type, target, modifier } = aThrow;
    const multiRolls = dice.map((die) => chosenRollFn(die));
    return { multiRolls, type, target, modifier, isAdditional };
  };

  const throwResults = throws.map((aThrow) => resolveThrow(aThrow));

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
      const backupWildThrow = wildThrow ?? resolveThrow(defaultWildThrow, true);
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
    throwResults: [...throwResults, ...additionalWildThrows],
    isCriticalFail,
    uuid,
  };
};

export const throwDice = generateThrowDice(roll);

export const notAce = (rollFn: RollFn) => (die: Die): MultiRollResult => {
  const result = rollFn(die);
  return {
    die,
    rolls: [result],
    sum: result,
  };
};

export const ace = (rollFn: RollFn) => (die: Die): MultiRollResult => {
  const rolls: number[] = [];
  let result;
  do {
    result = rollFn(die);
    rolls.push(result);
  } while (result === die);
  return { die, rolls, sum: rolls.reduce((a, b) => a + b) };
};
