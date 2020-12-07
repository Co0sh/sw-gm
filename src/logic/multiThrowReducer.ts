import { Reducer } from 'react';
import { produce } from 'immer';
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
      return produce(state, (state) => {
        state.acing = action.acing;
      });
    }
    case 'setCanFail': {
      return produce(state, (state) => {
        state.canFail = action.canFail;
      });
    }
    case 'setGlobalTarget': {
      return produce(state, (state) => {
        state.globalTarget = action.globalTarget;
        state.throws.forEach((aThrow) => {
          aThrow.target = action.globalTarget;
        });
      });
    }
    case 'setGlobalModifier': {
      return produce(state, (state) => {
        state.globalModifier = action.globalModifier;
        state.throws.forEach((aThrow) => {
          aThrow.modifier = action.globalModifier;
        });
      });
    }
    case 'setName': {
      return produce(state, (state) => {
        state.name = action.name;
      });
    }
    case 'addThrow': {
      return produce(state, (state) => {
        const defaultThrow = {
          regular: defaultRegularThrow,
          wild: defaultWildThrow,
        } as const;
        const newThrow: ThrowOptions = {
          ...defaultThrow[action.throwType],
          key: getKey(),
          name:
            action.throwType === 'wild'
              ? defaultWildThrow.name
              : state.throwNameTemplate,
          dice: [{ key: getKey(), sides: action.die }],
        };
        if (action.throwType === 'wild') {
          state.throws.push(newThrow);
        } else {
          state.throws.unshift(newThrow);
        }
        recalculateThrowNames(state);
      });
    }
    case 'removeThrow': {
      return produce(state, (state) => {
        state.throws = state.throws.filter(({ key }) => key !== action.key);
        recalculateThrowNames(state);
      });
    }
    case 'addDie': {
      return produce(state, (state) => {
        const aThrow = state.throws.find(({ key }) => key === action.throwKey);
        aThrow?.dice.unshift({ key: getKey(), sides: action.die });
      });
    }
    case 'changeDie': {
      return produce(state, (state) => {
        const aThrow = state.throws.find(({ key }) => key === action.throwKey);
        const die = aThrow?.dice.find(({ key }) => key === action.dieKey);
        if (die) {
          die.sides = action.die;
        }
      });
    }
    case 'removeDie': {
      return produce(state, (state) => {
        const index = state.throws.findIndex(
          ({ key }) => key === action.throwKey,
        );
        if (index < 0) {
          return;
        }
        const aThrow = state.throws[index];
        const dieIndex = aThrow.dice.findIndex(
          ({ key }) => key === action.dieKey,
        );
        if (dieIndex < 0) {
          return;
        }
        aThrow.dice.splice(dieIndex, 1);
        if (aThrow.dice.length === 0) {
          state.throws.splice(index, 1);
        }
      });
    }
    case 'setThrowModifier': {
      return produce(state, (state) => {
        const aThrow = state.throws.find(({ key }) => key === action.throwKey);
        if (aThrow) {
          aThrow.modifier = action.modifier;
        }
      });
    }
    case 'setThrowTarget': {
      return produce(state, (state) => {
        const aThrow = state.throws.find(({ key }) => key === action.throwKey);
        if (aThrow) {
          aThrow.target = action.target;
        }
      });
    }
    default: {
      return state;
    }
  }
};

const recalculateThrowNames = (state: MultiThrowOptions): MultiThrowOptions => {
  const regulars = state.throws.filter(({ type }) => type === 'regular');
  if (regulars.length > 1) {
    regulars.forEach((aThrow, index) => {
      aThrow.name = `${state.throwNameTemplate} ${index + 1}`;
    });
  }
  return state;
};
