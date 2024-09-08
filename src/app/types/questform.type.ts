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
  startItem?: string;
  rewards?: Rewards;
}

export interface ParentQuestForm {
  quests?: { quest: Questform }[];
}

interface Rewards {
  money: number;
  reputation: Reputation[];
  items: RewardItem[];
  titleID: string;
  honor: number;
  choiceItems: RewardItem[];
}

interface Reputation {
  factionID: string;
  amount: number;
}

interface RewardItem {
  rewardItemID: string;
  count: number;
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
  type: 'starter' | 'ender' | 'both';
  commentOut: boolean;
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

export interface ImportQuest {
  quests: { quest: Questform }[];
}

export interface QuestOutput {
  code: string;
  keyword: string;
}
