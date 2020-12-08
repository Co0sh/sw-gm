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
    id: asBaseSkillId('athletics'),
    name: 'Athletics',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: asBaseSkillId('commonKnowledge'),
    name: 'Common Knowledge',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: asBaseSkillId('notice'),
    name: 'Notice',
    attribute: 'smarts',
    isDefault: true,
  },
  {
    id: asBaseSkillId('persuasion'),
    name: 'Persuasion',
    attribute: 'spirit',
    isDefault: true,
  },
  {
    id: asBaseSkillId('stealth'),
    name: 'Stealth',
    attribute: 'agility',
    isDefault: true,
  },
  {
    id: asBaseSkillId('fighting'),
    name: 'Fighting',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('shooting'),
    name: 'Shooting',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('academics'),
    name: 'Academics',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('battle'),
    name: 'Battle',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('boating'),
    name: 'Boating',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('driving'),
    name: 'Driving',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('electronics'),
    name: 'Electronics',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('gambling'),
    name: 'Gambling',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('hacking'),
    name: 'Hacking',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('healing'),
    name: 'Healing',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('intimidation'),
    name: 'Intimidation',
    attribute: 'spirit',
    isDefault: false,
  },
  {
    id: asBaseSkillId('language'),
    name: 'Language',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('occult'),
    name: 'Occult',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('performance'),
    name: 'Performance',
    attribute: 'spirit',
    isDefault: false,
  },
  {
    id: asBaseSkillId('piloting'),
    name: 'Piloting',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('repair'),
    name: 'Repair',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('research'),
    name: 'Research',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('riding'),
    name: 'Riding',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('science'),
    name: 'Science',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('survival'),
    name: 'Survival',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('taunt'),
    name: 'Taunt',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('thievery'),
    name: 'Thievery',
    attribute: 'agility',
    isDefault: false,
  },
  {
    id: asBaseSkillId('faith'),
    name: 'Faith',
    attribute: 'spirit',
    isDefault: false,
  },
  {
    id: asBaseSkillId('focus'),
    name: 'Focus',
    attribute: 'spirit',
    isDefault: false,
  },
  {
    id: asBaseSkillId('psionics'),
    name: 'Psionics',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('spellcasting'),
    name: 'Spellcasting',
    attribute: 'smarts',
    isDefault: false,
  },
  {
    id: asBaseSkillId('weirdScience'),
    name: 'Weird Science',
    attribute: 'smarts',
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
    spirit: { base: 6 },
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
