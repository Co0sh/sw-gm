import { v4 } from 'uuid';
import { Die } from './die';

export type RollType = 'regular' | 'wild';

export interface DiceOptions {
  dice: Die[];
  acing: boolean;
  wildDie: Die | null;
  canFail: boolean;
}

export interface DiceThrowResult {
  mainRolls: RollResult[];
  wildRoll: RollResult | null;
  isCriticalFail: boolean;
  uuid: string;
}

export interface RollResult {
  die: Die;
  type: RollType;
  rolls: number[];
  sum: number;
}

export type RollFn = (dice: Die) => number;

export const roll: RollFn = (die: Die): number => {
  return Math.floor(Math.random() * die) + 1;
};

export const defaultDiceOptions: DiceOptions = {
  dice: [4],
  acing: true,
  wildDie: 6,
  canFail: true,
};

export const generateThrowDice = (rollFn: RollFn) => (
  options: Partial<DiceOptions> = {},
): DiceThrowResult => {
  const { dice, acing, wildDie, canFail } = {
    ...defaultDiceOptions,
    ...options,
  };

  const uuid = v4();

  const chosenRollFn = acing ? ace(rollFn) : notAce(rollFn);

  const mainRolls = dice.map((die) => chosenRollFn(die));
  const wildRoll = chosenRollFn(wildDie ?? 6, 'wild');

  const isCriticalFail =
    canFail &&
    wildRoll.sum === 1 &&
    [wildRoll, ...mainRolls].filter((r) => r.sum === 1).length >
      (mainRolls.length + 1) / 2;

  return {
    mainRolls,
    wildRoll: wildDie || isCriticalFail ? wildRoll : null,
    isCriticalFail,
    uuid,
  };
};

export const throwDice = generateThrowDice(roll);

export const notAce = (rollFn: RollFn) => (
  die: Die,
  type: RollType = 'regular',
): RollResult => {
  const result = rollFn(die);
  return {
    die,
    type,
    rolls: [result],
    sum: result,
  };
};

export const ace = (rollFn: RollFn) => (
  die: Die,
  type: RollType = 'regular',
): RollResult => {
  const rolls: number[] = [];
  let result;
  do {
    result = rollFn(die);
    rolls.push(result);
  } while (result === die);
  return { die, type, rolls, sum: rolls.reduce((a, b) => a + b) };
};

export const suggestRolls = (
  rolls: RollResult[],
  wildRoll: RollResult,
): RollResult[] => {
  const smallestValue = Math.min(...rolls.map((r) => r.sum));
  if (smallestValue >= wildRoll.sum) {
    return rolls;
  }
  let replaced = false;
  const results = rolls.map((roll) => {
    if (!replaced && roll.sum === smallestValue) {
      replaced = true;
      return wildRoll;
    }
    return roll;
  });
  return results;
};
