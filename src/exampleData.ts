import {
  BaseEdge,
  BaseHindrance,
  Character,
  Compendium,
  BaseSkill,
  BaseOrigin,
} from './logic/character';

export const exampleSkills: BaseSkill[] = [
  {
    id: 'notice',
    name: 'Notice',
    shortcut: 'Notice',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: 'athletics',
    name: 'Athlethics',
    shortcut: 'Athlethics',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: 'commonKnowledge',
    name: 'Common Knowledge',
    shortcut: 'Common Kn',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: 'stealth',
    name: 'Stealth',
    shortcut: 'Stealth',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    shortcut: 'Persuasion',
    attribute: 'spirits',
    isDefault: true,
  },
  {
    id: 'fighting',
    name: 'Fighting',
    shortcut: 'Fighting',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: 'shooting',
    name: 'Shooting',
    shortcut: 'Shooting',
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

export const exampleOrigins: BaseOrigin[] = [{ id: 'human', name: 'Human' }];

export const exampleCompendium: Compendium = {
  baseOrigins: exampleOrigins,
  baseSkills: exampleSkills,
  baseEdges: exampleEdges,
  baseHindrances: exampleHindrances,
  basePowers: [],
};

export const exampleCharacter: Character = {
  id: 'john',
  name: 'John',
  wildCard: true,
  image:
    'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/06/1517909336-capture66.PNG',
  origin: { originId: 'human', individualName: 'Barbarian' },
  pace: 6,
  runningDie: 6,
  parry: 7,
  toughness: 5,
  attributes: {
    strength: { base: 6 },
    agility: { base: 8 },
    vigor: { base: 6 },
    smarts: { base: 4 },
    spirits: { base: 6 },
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
