import { v4 } from 'uuid';
import {
  BaseEdge,
  BaseHindrance,
  Character,
  Compendium,
  BaseSkill,
  BaseOrigin,
  asBaseSkillId,
  asBaseEdgeId,
  asBaseHindranceId,
  asBaseOriginId,
  asCompendiumId,
  asCharacterId,
  asOriginId,
  asSkillId,
  asHindranceId,
  asEdgeId,
} from './logic/character';

export const exampleSkills: BaseSkill[] = [
  {
    id: asBaseSkillId('notice'),
    name: 'Notice',
    shortcut: 'Notice',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: asBaseSkillId('athletics'),
    name: 'Athlethics',
    shortcut: 'Athlethics',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: asBaseSkillId('commonKnowledge'),
    name: 'Common Knowledge',
    shortcut: 'Common Kn',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: asBaseSkillId('stealth'),
    name: 'Stealth',
    shortcut: 'Stealth',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: asBaseSkillId('persuasion'),
    name: 'Persuasion',
    shortcut: 'Persuasion',
    attribute: 'spirits',
    isDefault: true,
  },
  {
    id: asBaseSkillId('fighting'),
    name: 'Fighting',
    shortcut: 'Fighting',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('shooting'),
    name: 'Shooting',
    shortcut: 'Shooting',
    attribute: 'agility',
    isDefault: false,
  },
];

export const exampleEdges: BaseEdge[] = [
  {
    id: asBaseEdgeId('ambidextrous'),
    name: 'Ambidextrous',
    requiredRank: 'novice',
    requiredAttributes: [{ name: 'agility', value: 8 }],
  },
];

export const exampleHindrances: BaseHindrance[] = [
  {
    id: asBaseHindranceId('allThumbs'),
    name: 'All Thumbs',
    levels: ['minor'],
  },
];

export const exampleOrigins: BaseOrigin[] = [
  { id: asBaseOriginId('human'), name: 'Human' },
];

export const exampleCompendium: Compendium = {
  id: asCompendiumId('example'),
  name: 'Example',
  baseOrigins: exampleOrigins,
  baseSkills: exampleSkills,
  baseEdges: exampleEdges,
  baseHindrances: exampleHindrances,
  basePowers: [],
};

export const exampleCharacter: Character = {
  id: asCharacterId(v4()),
  name: 'John',
  wildCard: true,
  image:
    'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/06/1517909336-capture66.PNG',
  origin: {
    id: asOriginId(v4()),
    originId: exampleOrigins[0].id,
    individualName: 'Barbarian',
  },
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
    { id: asSkillId(v4()), skillId: exampleSkills[0].id, level: { base: 6 } },
    { id: asSkillId(v4()), skillId: exampleSkills[1].id, level: { base: 8 } },
    { id: asSkillId(v4()), skillId: exampleSkills[2].id, level: { base: 4 } },
    { id: asSkillId(v4()), skillId: exampleSkills[3].id, level: { base: 8 } },
    { id: asSkillId(v4()), skillId: exampleSkills[4].id, level: { base: 6 } },
    { id: asSkillId(v4()), skillId: exampleSkills[5].id, level: { base: 10 } },
  ],
  edges: [{ id: asEdgeId(v4()), edgeId: exampleEdges[0].id }],
  hindrances: [
    {
      id: asHindranceId(v4()),
      hindranceId: exampleHindrances[0].id,
      level: 'minor',
    },
  ],
};
