export interface Questform {
  title?: string;
  objectives?: Objective[];
  designerComments?: string;
  moduleName?: string;
  objectiveText?: string;
  pickupText?: string;
  incompleteText?: string;
  completeText?: string;
  completeLogText?: string;
  POIs?: POI[];
  questGivers?: QuestGiver[];
  faction?: Factions;
  level?: number;
  levelRequired?: number;
  flags?: Flags;
  groupSize?: number;
  difficulty?: string;
  areaSort?: string;
}

export interface ParentQuestForm {
  quests?: { quest: Questform }[];
}

interface ObjectiveItem {
  objectiveItemID: string;
  count: number;
}

interface ObjectiveCreature {
  objectiveCreatureID: string;
  count: number;
}

type Objective = ObjectiveItem | ObjectiveCreature;

export interface POI {
  objective: number;
  x: number;
  y: number;
  z: number;
  o: number;
  map: number | string;
}

export type QuestGiverEntityType = 'creature' | 'object';

interface QuestGiver {
  entityType: QuestGiverEntityType;
  id: string;
  starter: boolean;
}

export type Factions = 'neutral' | 'alliance' | 'horde';

export interface Flags {
  sharable?: boolean;
  pvp?: boolean;
  partyAccept?: boolean;
  repeatable?: boolean;
  stayAlive?: boolean;
  daily?: boolean;
  raid?: boolean;
  weekly?: boolean;
}
