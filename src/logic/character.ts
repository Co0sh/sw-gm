import { Die } from '../model/die.model';

export interface CharacterId extends String {
  __CharacterId: never;
}

export const asCharacterId = (id: string): CharacterId => id as any;

export interface Character {
  id: CharacterId;
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

export type PartialCharacter = Pick<
  Character,
  'id' | 'name' | 'image' | 'origin'
>;

export type AttributeName =
  | 'strength'
  | 'agility'
  | 'vigor'
  | 'smarts'
  | 'spirit';

export type Attributes = { [key in AttributeName]: TraitLevel };

export interface TraitLevel {
  base: Die;
  bonus?: number;
}

export interface OriginId extends String {
  __OriginId: never;
}

export const asOriginId = (id: string): OriginId => id as any;

export interface Origin {
  id: OriginId;
  originId: BaseOriginId;
  individualName?: string;
}

export interface BaseOriginId extends String {
  __BaseOriginId: never;
}

export const asBaseOriginId = (id: string): BaseOriginId => id as any;

export interface BaseOrigin {
  id: BaseOriginId;
  name: string;
  description?: string;
  defaultImage?: string;
}

export interface SkillId extends String {
  __SkillId: never;
}

export const asSkillId = (id: string): SkillId => id as any;

export interface Skill {
  id: SkillId;
  skillId: BaseSkillId;
  level: TraitLevel;
}

export interface BaseSkillId extends String {
  __BaseSkillId: never;
}

export const asBaseSkillId = (id: string): BaseSkillId => id as any;

export interface BaseSkill {
  id: BaseSkillId;
  name: string;
  shortDescription?: string;
  description?: string;
  attribute: AttributeName;
  isDefault: boolean;
}

export interface EdgeId extends String {
  __EdgeId: never;
}

export const asEdgeId = (id: string): EdgeId => id as any;

export interface Edge {
  id: EdgeId;
  edgeId: BaseEdgeId;
  trappings?: string;
  extendedTrappings?: string;
}

export type Rank = 'novice' | 'seasoned' | 'veteran' | 'legendary';

export interface BaseEdgeId extends String {
  __BaseEdgeId: never;
}

export const asBaseEdgeId = (id: string): BaseEdgeId => id as any;

export interface BaseEdge {
  id: BaseEdgeId;
  name: string;
  shortDescription?: string;
  description?: string;
  requiredRank: Rank;
  requiredAttributes?: { name: AttributeName; value: Die }[];
  requiredSkills?: Skill[];
  requiredEdges?: string[];
}

export type HindranceLevel = 'minor' | 'major';

export interface HindranceId extends String {
  __HindranceId: never;
}

export const asHindranceId = (id: string): HindranceId => id as any;

export interface Hindrance {
  id: HindranceId;
  hindranceId: BaseHindranceId;
  level: HindranceLevel;
  trappings?: string;
  extendedTrappings?: string;
}

export interface BaseHindranceId extends String {
  __BaseHindranceId: never;
}

export const asBaseHindranceId = (id: string): BaseHindranceId => id as any;

export interface BaseHindrance {
  id: BaseHindranceId;
  name: string;
  shortDescription?: string;
  description?: string;
  levels: HindranceLevel[];
}

export interface PowerId extends String {
  __PowerId: never;
}

export const asPowerId = (id: string): PowerId => id as any;

export interface Power {
  id: PowerId;
  powerId: BasePowerId;
}

export interface BasePowerId extends String {
  __BasePowerId: never;
}

export const asBasePowerId = (id: string): BasePowerId => id as any;

export interface BasePower {
  id: BasePowerId;
  name: string;
}

export interface CompendiumId extends String {
  __CompendiumId: never;
}

export const asCompendiumId = (id: string): CompendiumId => id as any;

export interface Compendium {
  id: CompendiumId;
  name: string;
  baseOrigins: BaseOrigin[];
  baseSkills: BaseSkill[];
  baseEdges: BaseEdge[];
  baseHindrances: BaseHindrance[];
  basePowers: BasePower[];
}
