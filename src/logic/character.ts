import { Die } from './die';

export interface Character {
  id: string;
  name: string;
  wildCard: boolean;
  bennies?: number;
  wounds?: number;
  fatigue?: number;
  statuses?: string[];
  bio?: string;
  image?: string;
  origin?: Origin;
  pace: number;
  runningDie: Die;
  toughness: number;
  parry: number;
  attributes: Attributes;
  skills: Skill[];
  edges: Edge[];
  hindrances: Hindrance[];
  powers?: Power[];
}

export type AttributeName =
  | 'strength'
  | 'agility'
  | 'vigor'
  | 'smarts'
  | 'spirits';

export type Attributes = { [key in AttributeName]: TraitLevel };

export interface TraitLevel {
  base: Die;
  bonus?: number;
}

export interface Origin {
  originId: string;
  individualName?: string;
}

export interface BaseOrigin {
  id: string;
  name: string;
  description?: string;
  defaultImage?: string;
}

export interface Skill {
  skillId: string;
  level: TraitLevel;
}

export interface BaseSkill {
  id: string;
  name: string;
  shortcut: string;
  shortDescription?: string;
  description?: string;
  attribute: AttributeName;
  isDefault: boolean;
}

export interface Edge {
  edgeId: string;
  trappings?: string;
  extendedTrappings?: string;
}

export type Rank = 'novice' | 'seasoned' | 'veteran' | 'legendary';

export interface BaseEdge {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  requiredRank: Rank;
  requiredAttributes?: { name: AttributeName; value: Die }[];
  requiredSkills?: Skill[];
  requiredEdges?: string[];
}

export type HindranceLevel = 'minor' | 'major';

export interface Hindrance {
  hindranceId: string;
  level: HindranceLevel;
  trappings?: string;
  extendedTrappings?: string;
}

export interface BaseHindrance {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  levels: HindranceLevel[];
}

export interface Power {
  powerId: string;
}

export interface BasePower {
  id: string;
  name: string;
}

export interface Compendium {
  baseOrigins: BaseOrigin[];
  baseSkills: BaseSkill[];
  baseEdges: BaseEdge[];
  baseHindrances: BaseHindrance[];
  basePowers: BasePower[];
}
