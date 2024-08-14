import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { POI, Questform } from '../../../types/questform.type';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private questValues = new BehaviorSubject<Questform>({});

  getQuestValues() {
    return this.questValues.asObservable();
  }

  setQuestValues(values: Questform) {
    this.questValues.next(values);
  }

  constructor() {}

  constructCode() {
    const title = this.questValues.value.title;
    if (!title) return '';

    const objectives = this.constructObjectives();
    const comments = this.constructComments();
    const moduleName = this.questValues.value.moduleName;
    const textContent = this.constructTextContent();
    const POIs = this.constructPOIs();
    const questGivers = this.constructQuestGivers();
    const factions = this.constructFactions();
    const level = this.constructLevel();
    const levelRequired = this.constructLevelRequired();
    const flags = this.constructFlags();
    const groupSize = this.constructGroupSize(
      title.split(' ').join('_').toUpperCase()
    );
    const difficulty = this.constructDifficulty();

    let code = `${comments}export const ${title
      .split(' ')
      .join('_')
      .toUpperCase()} = std.Quests.create('${moduleName}', '${title
      .split(' ')
      .join('-')
      .toUpperCase()}')${textContent.map((text) => text).join('')} ${objectives
      .map((objective) => objective)
      .join('')} ${POIs.map((poi) => poi).join('')} ${questGivers
      .map((questGiver) => questGiver)
      .join('')} ${factions} ${level} ${levelRequired} ${flags
      .map((flag) => flag)
      .join('')} ${difficulty}
      .Name.enGB.set('${title}'); ${groupSize}`;

    return code;
  }

  constructComments() {
    const designerComments = this.questValues.value.designerComments;
    if (!designerComments || designerComments === '') return '';

    return `/*
${designerComments}
*/
`;
  }

  constructObjectives() {
    const objectiveObj = this.questValues.value.objectives;
    if (!objectiveObj) {
      return [''];
    }

    const returnCode: string[] = [];

    objectiveObj.forEach((objective) => {
      if ('objectiveItemID' in objective) {
        const formattedId = this.formatID(objective.objectiveItemID);

        returnCode.push(`
      .Objectives.Item.add(${formattedId}, ${objective.count})`);
      } else {
        const formattedID = this.formatID(objective.objectiveCreatureID);

        returnCode.push(`
      .Objectives.Entity.add(${formattedID}, ${objective.count})`);
      }
    });

    return returnCode;
  }

  constructTextContent() {
    const returnCode = [''];

    // Mapping text types to method names
    const textTypes = [
      { type: 'objectiveText', method: '.ObjectiveText.enGB.set' },
      { type: 'pickupText', method: '.PickupText.enGB.set' },
      { type: 'incompleteText', method: '.IncompleteText.enGB.set' },
      { type: 'completeText', method: '.CompleteText.enGB.set' },
      { type: 'completeLogText', method: '.CompleteLogText.enGB.set' },
    ];

    // Iterate over each text type and append to returnCode if value exists
    textTypes.forEach(({ type, method }) => {
      const textValue = this.questValues.value[type as keyof Questform];
      if (textValue) {
        returnCode.push(`
      ${method}(\`${textValue}\`)`);
      }
    });

    return returnCode;
  }

  constructPOIs() {
    if (!this.questValues.value.POIs) {
      return [];
    }

    const returnCode: string[] = [];

    const groupedByObjective = this.questValues.value.POIs.reduce(
      (acc, poi) => {
        const key = poi.objective;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(poi);
        return acc;
      },
      {} as Record<number, POI[]>
    );

    Object.entries(groupedByObjective).forEach(([objective, POIs]) => {
      const poiStrings: string[] = [];

      POIs.forEach((poi) =>
        poiStrings.push(
          `
      {x: ${poi.x}, y: ${poi.y}, z: ${poi.z}, o: ${poi.o}, map: ${poi.map}}`
        )
      );

      returnCode.push(`
    .POIs.add(${objective}, [${poiStrings.map((poi) => poi)}])`);
    });

    return returnCode;
  }

  constructQuestGivers() {
    if (!this.questValues.value.questGivers) {
      return [''];
    }

    const returnCode: string[] = [];
    const methodMapping = {
      creaturetrue: '.Questgiver.addCreatureStarter',
      creaturefalse: '.Questgiver.addCreatureEnder',
      objecttrue: '.Questgiver.addObjectStarter',
      objectfalse: '.Questgiver.addObjectEnder',
    };

    this.questValues.value.questGivers.forEach((questGiver) => {
      const entityType = questGiver.entityType;
      const methodKey = `${entityType}${questGiver.starter}`;
      const methodName = methodMapping[methodKey as keyof typeof methodMapping];

      if (methodName) {
        const formattedId = this.formatID(questGiver.id);
        returnCode.push(`
      ${methodName}(${formattedId})`);
      }
    });

    return returnCode;
  }

  constructFactions() {
    const faction = this.questValues.value.faction;

    if (!faction) {
      return '';
    }

    let factionCode = faction.toUpperCase();
    if (factionCode === 'NEUTRAL') factionCode = 'ALL';

    return `
      .RaceMask.${factionCode}.set(true)`;
  }

  constructLevel() {
    const level = this.questValues.value.level;

    if (level === undefined) return '';

    return `
      .QuestLevel.set(${level})`;
  }

  constructLevelRequired() {
    const levelRequired = this.questValues.value.levelRequired;

    return levelRequired === undefined
      ? ''
      : `
      .MinLevel.set(${levelRequired})`;
  }

  constructFlags(): string[] {
    const { flags } = this.questValues.value;

    if (!flags) return [''];

    const flagMap = {
      SHARABLE: flags.sharable,
      PVP: flags.pvp,
      PARTY_ACCEPT: flags.partyAccept,
      STAY_ALIVE: flags.stayAlive,
      DAILY: flags.daily,
      RAID: flags.raid,
      WEEKLY: flags.weekly,
    };

    return Object.entries(flagMap)
      .filter(([_, value]) => value !== undefined)
      .map(
        ([key, value]) => `
      .Flags.${key}.set(${value})`
      );
  }

  constructGroupSize(titleVar: string) {
    const groupSize = this.questValues.value.groupSize;

    return groupSize === undefined
      ? ''
      : `
${titleVar}.row.SuggestedGroupNum.set(${groupSize})`;
  }

  constructDifficulty() {
    const difficulty = this.questValues.value.difficulty;

    return difficulty === undefined
      ? ''
      : `
      .Rewards.Difficulty.set(${difficulty})`;
  }

  formatID(ID: string) {
    return /^\d+$/.test(ID) ? ID : `${ID}.ID`;
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.constructCode());
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
