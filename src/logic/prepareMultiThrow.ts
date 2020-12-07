import { Die } from '../model/die.model';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';
import { getKey } from './key';
import {
  defaultTarget,
  defaultThrowName,
  defaultWildDie,
  defaultWildThrowName,
} from './rolls';

type Options = TraitThrowOptions;

interface TraitThrowOptions {
  type: 'trait';
  name: string;
  traitDie: Die;
  wildDie?: Die;
  target?: number;
  modifier?: number;
}

export const prepareMultiThrow = (options: Options): MultiThrowOptions => {
  switch (options.type) {
    case 'trait': {
      const {
        name,
        traitDie,
        wildDie = defaultWildDie,
        target = defaultTarget,
        modifier = 0,
      } = options;
      const result: MultiThrowOptions = {
        name,
        acing: true,
        canFail: true,
        globalModifier: modifier,
        globalTarget: target,
        throwNameTemplate: defaultThrowName,
        throws: [
          {
            key: getKey(),
            dice: [{ key: getKey(), sides: traitDie }],
            type: 'regular',
            target,
            modifier,
            name: defaultThrowName,
          },
          {
            key: getKey(),
            dice: [{ key: getKey(), sides: wildDie }],
            type: 'wild',
            target,
            modifier,
            name: defaultWildThrowName,
          },
        ],
      };

      return result;
    }
  }
};
