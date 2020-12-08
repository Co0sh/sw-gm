import { asCharacterId, asSkillId, Character } from './character';
import { v4 } from 'uuid';
import { useCompendium } from '../components/CompendiumManager';

export const useCreateCharacter = () => {
  const { compendium } = useCompendium();

  return (options: Partial<Character>): Character => {
    const { baseSkills } = compendium;

    const defaultSkills = baseSkills.filter((s) => s.isDefault);

    return {
      id: asCharacterId(v4()),
      name: 'Character',
      attributes: {
        strength: { base: 4 },
        agility: { base: 4 },
        vigor: { base: 4 },
        smarts: { base: 4 },
        spirit: { base: 4 },
      },
      edges: [],
      hindrances: [],
      skills: defaultSkills.map((s) => ({
        id: asSkillId(v4()),
        skillId: s.id,
        level: { base: 4 },
      })),
      pace: 6,
      runningDie: 6,
      parry: 2,
      toughness: 4,
      wildCard: false,
      ...options,
    };
  };
};
