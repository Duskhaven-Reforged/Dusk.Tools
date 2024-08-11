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
}

interface ObjectiveItem {
  objectiveItemID: number;
  count: number;
}

interface ObjectiveCreature {
  objectiveCreatureID: number;
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
