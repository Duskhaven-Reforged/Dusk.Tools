export interface NPCForm {
  name?: string;
  moduleName?: string;
  subname?: string;
  minLevel?: number;
  maxLevel?: number;
  class?: UnitClass;
  rank?: string;
  type?: CreatureType;
  factionTemplate?: string;
  family?: string;
  damageSchool?: string;
  primaryFlags?: NPCPrimaryFlags;
  secondaryFlags?: NPCSecondaryFlags;
  gossipMenu?: string;
  designerComments?: string;
  models?: NPCModels[];
  loot?: LootItem[];
  weapon?: Weapon;
}

export interface NPCPrimaryFlags {
  gossip?: boolean;
  repair?: boolean;
  questGiver?: boolean;
  flightMaster?: boolean;
  trainer?: boolean;
  innKeeper?: boolean;
  vendor?: boolean;
}

export interface NPCSecondaryFlags {
  immuneToPlayers?: boolean;
  immuneToNPC?: boolean;
  // notInteractable?: boolean;
  // canWalk?: boolean;
  canSwim?: boolean;
  // canFly?: boolean;
  skinnable?: boolean;
  // noWoundAnimation?: boolean;
  forceGossip?: boolean;
  // isBoss?: boolean;
}

type NPCModels = { npcID: number } | { visualID: number };

export interface NPCCopyModel {
  npcID: number;
}

export interface VisualModel {
  visualID: number;
}

interface LootItem {
  itemID: string;
  dropChance: number;
  minDropAmount: number;
  maxDropAmount: number;
}

interface Weapon {
  rightHand: string;
  leftHand: string;
  ranged: string;
}

type UnitClass = 'WARRIOR' | 'MAGE' | 'ROGUE' | 'PALADIN';
type CreatureType =
  | 'NONE'
  | 'BEAST'
  | 'DRAGONKIN'
  | 'DEMON'
  | 'ELEMENTAL'
  | 'GIANT'
  | 'UNDEAD'
  | 'HUMANOID'
  | 'CRITTER'
  | 'MECHANICAL'
  | 'NOT_SPECIFIED'
  | 'TOTEM'
  | 'NON_COMBAT_PET'
  | 'GAS_CLOUD'
  | 'WILD_PET'
  | 'ABBERATION';

export enum CreatureFamily {
  WOLF = 1,
  CAT = 2,
  SPIDER = 3,
  BEAR = 4,
  BOAR = 5,
  CROCOLISK = 6,
  CARRION_BIRD = 7,
  CRAB = 8,
  GORILLA = 9,
  RAPTOR = 11,
  TALLSTRIDER = 12,
  FELHUNTER = 15,
  VOIDWALKER = 16,
  SUCCUBUS = 17,
  DOOMGUARD = 19,
  SCORPID = 20,
  TURTLE = 21,
  IMP = 23,
  BAT = 24,
  HYENA = 25,
  BIRD_OF_PREY = 26,
  WIND_SERPENT = 27,
  REMOTE_CONTROL = 28,
  FELGUARD = 29,
  DRAGONHAWK = 30,
  RAVAGER = 31,
  WARP_STALKER = 32,
  SPOREBAT = 33,
  NETHER_RAY = 34,
  SERPENT = 35,
  MOTH = 37,
  CHIMAERA = 38,
  DEVILSAUR = 39,
  GHOUL = 40,
  SILITHID = 41,
  WORM = 42,
  RHINO = 43,
  WASP = 44,
  CORE_HOUND = 45,
  SPIRIT_BEAST = 46,
}
