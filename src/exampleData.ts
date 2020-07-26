import {
  BaseEdge,
  BaseHindrance,
  Character,
  Compendium,
  Origin,
  BaseSkill,
} from './logic/character';

export const exampleSkills: BaseSkill[] = [
  {
    id: 'notice',
    name: 'Notice',
    shortcut: 'Notc',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: 'athletics',
    name: 'Athlethics',
    shortcut: 'Athl',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: 'commonKnowledge',
    name: 'Common Knowledge',
    shortcut: 'CmKn',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: 'stealth',
    name: 'Stealth',
    shortcut: 'Stlh',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    shortcut: 'Prsn',
    attribute: 'spirit',
    isDefault: true,
  },
  {
    id: 'fighting',
    name: 'Fighting',
    shortcut: 'Fght',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: 'shooting',
    name: 'Shooting',
    shortcut: 'Shot',
    attribute: 'agility',
    isDefault: false,
  },
];

export const exampleEdges: BaseEdge[] = [
  {
    id: 'ambidextrous',
    name: 'Ambidextrous',
    requiredRank: 'novice',
    requiredAttributes: [{ name: 'agility', value: 8 }],
  },
];

export const exampleHindrances: BaseHindrance[] = [
  {
    id: 'allThumbs',
    name: 'All Thumbs',
    levels: ['minor'],
  },
];

export const exampleOrigins: Origin[] = [{ id: 'human', name: 'Human' }];

export const exampleCompendium: Compendium = {
  origins: exampleOrigins,
  baseSkills: exampleSkills,
  baseEdges: exampleEdges,
  baseHindrances: exampleHindrances,
  basePowers: [],
};

export const exampleCharacter: Character = {
  name: 'Teodor',
  wildCard: true,
  originId: 'human',
  pace: 6,
  runningDie: 6,
  parry: 7,
  toughness: 5,
  attributes: {
    strength: { base: 6 },
    agility: { base: 8 },
    vigor: { base: 6 },
    smarts: { base: 4 },
    spirit: { base: 6 },
  },
  skills: [
    { skillId: 'notice', level: { base: 6 } },
    { skillId: 'athletics', level: { base: 8 } },
    { skillId: 'commonKnowledge', level: { base: 4 } },
    { skillId: 'stealth', level: { base: 8 } },
    { skillId: 'persuasion', level: { base: 6 } },
    { skillId: 'fighting', level: { base: 10 } },
  ],
  edges: [{ edgeId: 'ambidextrous' }],
  hindrances: [{ hindranceId: 'allThumbs', level: 'minor' }],
};
