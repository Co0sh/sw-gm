import { Reducer } from 'react';
import { Die } from '../model/die.model';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';
import { ThrowOptions, ThrowOptionsKey } from '../model/throwOptions.model';
import { ThrowType } from '../model/throwType.model';
import { UniqueDieKey } from '../model/uniqueDie.model';
import { getKey } from './key';
import { defaultRegularThrow, defaultWildThrow } from './rolls';

export type MultiThrowAction =
  | Reset
  | SetAcing
  | SetCanFail
  | SetGlobalTarget
  | SetGlobalModifier
  | SetName
  | AddThrow
  | RemoveThrow
  | AddDie
  | ChangeDie
  | RemoveDie
  | SetThrowModifier
  | SetThrowTarget;

interface Reset {
  type: 'reset';
  value: MultiThrowOptions;
}

interface SetAcing {
  type: 'setAcing';
  acing: boolean;
}

interface SetCanFail {
  type: 'setCanFail';
  canFail: boolean;
}

interface SetGlobalTarget {
  type: 'setGlobalTarget';
  globalTarget: number;
}

interface SetGlobalModifier {
  type: 'setGlobalModifier';
  globalModifier: number;
}

interface SetName {
  type: 'setName';
  name: string;
}

interface AddThrow {
  type: 'addThrow';
  die: Die;
  throwType: ThrowType;
}

interface RemoveThrow {
  type: 'removeThrow';
  key: ThrowOptionsKey;
}

interface AddDie {
  type: 'addDie';
  die: Die;
  throwKey: ThrowOptionsKey;
}

interface ChangeDie {
  type: 'changeDie';
  die: Die;
  dieKey: UniqueDieKey;
  throwKey: ThrowOptionsKey;
}

interface RemoveDie {
  type: 'removeDie';
  dieKey: UniqueDieKey;
  throwKey: ThrowOptionsKey;
}

interface SetThrowModifier {
  type: 'setThrowModifier';
  modifier: number;
  throwKey: ThrowOptionsKey;
}

interface SetThrowTarget {
  type: 'setThrowTarget';
  target: number;
  throwKey: ThrowOptionsKey;
}

export const multiThrowReducer: Reducer<MultiThrowOptions, MultiThrowAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'reset': {
      return action.value;
    }
    case 'setAcing': {
      return { ...state, acing: action.acing };
    }
    case 'setCanFail': {
      return { ...state, canFail: action.canFail };
    }
    case 'setGlobalTarget': {
      return {
        ...state,
        globalTarget: action.globalTarget,
        throws: state.throws.map((aThrow) => ({
          ...aThrow,
          target: action.globalTarget,
        })),
      };
    }
    case 'setGlobalModifier': {
      return {
        ...state,
        globalModifier: action.globalModifier,
        throws: state.throws.map((aThrow) => ({
          ...aThrow,
          modifier: action.globalModifier,
        })),
      };
    }
    case 'setName': {
      return { ...state, name: action.name };
    }
    case 'addThrow': {
      const defaultThrow = {
        regular: defaultRegularThrow,
        wild: defaultWildThrow,
      } as const;
      const newThrow: ThrowOptions = {
        ...defaultThrow[action.throwType],
        key: getKey(),
        name: '',
        dice: [{ key: getKey(), sides: action.die }],
      };
      return { ...state, throws: [newThrow, ...state.throws] };
    }
    case 'removeThrow': {
      return {
        ...state,
        throws: state.throws.filter(({ key }) => key !== action.key),
      };
    }
    case 'addDie': {
      return {
        ...state,
        throws: state.throws.map((aThrow) =>
          aThrow.key !== action.throwKey
            ? aThrow
            : {
                ...aThrow,
                dice: [{ key: getKey(), sides: action.die }, ...aThrow.dice],
              },
        ),
      };
    }
    case 'changeDie': {
      return {
        ...state,
        throws: state.throws.map((aThrow) =>
          aThrow.key !== action.throwKey
            ? aThrow
            : {
                ...aThrow,
                dice: aThrow.dice.map((uniqueDie) =>
                  uniqueDie.key !== action.dieKey
                    ? uniqueDie
                    : { ...uniqueDie, sides: action.die },
                ),
              },
        ),
      };
    }
    case 'removeDie': {
      return {
        ...state,
        throws: state.throws
          .map((aThrow) =>
            aThrow.key !== action.throwKey
              ? aThrow
              : {
                  ...aThrow,
                  dice: aThrow.dice.filter(({ key }) => key !== action.dieKey),
                },
          )
          .filter((aThrow) => aThrow.dice.length > 0),
      };
    }
    case 'setThrowModifier': {
      return {
        ...state,
        throws: state.throws.map((aThrow) =>
          aThrow.key !== action.throwKey
            ? aThrow
            : { ...aThrow, modifier: action.modifier },
        ),
      };
    }
    case 'setThrowTarget': {
      return {
        ...state,
        throws: state.throws.map((aThrow) =>
          aThrow.key !== action.throwKey
            ? aThrow
            : { ...aThrow, target: action.target },
        ),
      };
    }
    default: {
      return state;
    }
  }
};
