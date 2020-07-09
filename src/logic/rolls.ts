export interface DiceOptions {
  acing: boolean;
  wildDie: number | null;
  rollFn: RollFn;
}

export interface RollResult {
  rolls: number[];
  sum: number;
}

export interface DiceThrowResult {
  mainRolls: RollResult[];
  wildRoll: RollResult | null;
  isCriticalFail: boolean;
}

export type RollFn = (dice: number) => number;

export const roll: RollFn = (dice: number): number => {
  return Math.floor(Math.random() * dice) + 1;
};

export const defaultDiceOptions: DiceOptions = {
  acing: true,
  wildDie: 6,
  rollFn: roll,
};

export const throwDice = (
  dice: number,
  times: number,
  options: Partial<DiceOptions> = {},
): DiceThrowResult => {
  const { acing, wildDie, rollFn } = { ...defaultDiceOptions, ...options };

  const chosenRollFn = acing ? ace(rollFn) : notAce(rollFn);

  const mainRolls = new Array(times).fill(null).map(() => chosenRollFn(dice));
  const wildRoll = chosenRollFn(wildDie ?? 6);

  const isCriticalFail =
    wildRoll.sum === 1 &&
    [wildRoll, ...mainRolls].filter((r) => r.sum === 1).length >=
      (mainRolls.length + 1) / 2;

  return {
    mainRolls,
    wildRoll: wildDie || isCriticalFail ? wildRoll : null,
    isCriticalFail,
  };
};

export const notAce = (rollFn: RollFn) => (dice: number): RollResult => {
  const result = rollFn(dice);
  return {
    rolls: [result],
    sum: result,
  };
};

export const ace = (rollFn: RollFn) => (dice: number): RollResult => {
  const rolls: number[] = [];
  let result;
  do {
    result = rollFn(dice);
    rolls.push(result);
  } while (result === dice);
  return { rolls, sum: rolls.reduce((a, b) => a + b) };
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
