import produce from 'immer';
import { Reducer } from 'react';
import { v4 } from 'uuid';
import {
  asSkillId,
  AttributeName,
  BaseSkillId,
  Character,
  TraitLevel,
} from './character';

export type CharacterAction = SetAttribute | SetSkill | ClearSkill;

interface SetAttribute {
  type: 'setAttribute';
  attribute: AttributeName;
  level: TraitLevel;
}

interface SetSkill {
  type: 'setSkill';
  skill: BaseSkillId;
  level: TraitLevel;
}

interface ClearSkill {
  type: 'clearSkill';
  skill: BaseSkillId;
}

export const characterReducer: Reducer<Character, CharacterAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'setAttribute': {
      return produce(state, (state) => {
        state.attributes[action.attribute] = action.level;
      });
    }
    case 'setSkill': {
      return produce(state, (state) => {
        const skill = state.skills.find(
          ({ skillId }) => skillId === action.skill,
        );
        if (skill) {
          skill.level = action.level;
        } else {
          state.skills.push({
            id: asSkillId(v4()),
            skillId: action.skill,
            level: action.level,
          });
        }
      });
    }
    case 'clearSkill': {
      return produce(state, (state) => {
        const index = state.skills.findIndex(
          ({ skillId }) => skillId === action.skill,
        );
        if (index !== -1) {
          state.skills.splice(index, 1);
        }
      });
    }
    default: {
      return state;
    }
  }
};
