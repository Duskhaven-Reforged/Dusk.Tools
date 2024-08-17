import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import {
  ImportQuest,
  ParentQuestForm,
  POI,
  Questform,
} from '../../../types/questform.type';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  public questValues = new BehaviorSubject<ParentQuestForm>({});
  public importedQuest = new BehaviorSubject<ImportQuest | undefined>(
    undefined
  );

  getImportedQuest() {
    return this.importedQuest.asObservable();
  }

  setImportedQuest(jsonData: ImportQuest) {
    this.importedQuest.next(jsonData);
  }

  getQuestValues() {
    return this.questValues.asObservable();
  }

  setQuestValues(values: ParentQuestForm) {
    this.questValues.next(values);
  }

  constructor() {}

  constructCode() {
    if (!this.questValues.value.quests) {
      return '';
    }

    const code = this.questValues.value.quests
      .map((questObj) => {
        const title = questObj.quest.title;
        if (!title) return '';

        const objectives = this.constructObjectives(questObj.quest);
        const comments = this.constructComments(questObj.quest);
        const moduleName = questObj.quest.moduleName;
        const textContent = this.constructTextContent(questObj.quest);
        const POIs = this.constructPOIs(questObj.quest);
        const questGivers = this.constructQuestGivers(questObj.quest);
        const factions = this.constructFactions(questObj.quest);
        const level = this.constructLevel(questObj.quest);
        const levelRequired = this.constructLevelRequired(questObj.quest);
        const flags = this.constructFlags(questObj.quest);
        const groupSize = this.constructGroupSize(
          title.split(' ').join('_').toUpperCase(),
          questObj.quest
        );
        const difficulty = this.constructDifficulty(questObj.quest);
        const areaSort = this.constructAreaSort(questObj.quest);

        return `${comments}export const ${title
          .split(' ')
          .join('_')
          .toUpperCase()} = std.Quests.create('${moduleName}', '${title
          .split(' ')
          .join('-')
          .toUpperCase()}')${textContent
          .map((text) => text)
          .join('')} ${objectives
          .map((objective) => objective)
          .join('')} ${POIs.map((poi) => poi).join('')} ${questGivers
          .map((questGiver) => questGiver)
          .join('')} ${factions} ${level} ${levelRequired} ${flags
          .map((flag) => flag)
          .join('')} ${difficulty} ${areaSort}
      .Name.enGB.set('${title}'); ${groupSize}`;
      })
      .join('\n\r\n\r');

    return code;
  }

  constructComments(quest: Questform) {
    const designerComments = quest.designerComments;
    if (!designerComments || designerComments === '') return '';

    return `/*
${designerComments}
*/
`;
  }

  constructObjectives(quest: Questform) {
    const objectiveObj = quest.objectives;
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

  constructTextContent(quest: Questform) {
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
      const textValue = quest[type as keyof Questform];
      if (textValue) {
        returnCode.push(`
      ${method}(\`${textValue}\`)`);
      }
    });

    return returnCode;
  }

  constructPOIs(quest: Questform) {
    if (!quest.POIs) {
      return [];
    }

    const returnCode: string[] = [];

    const groupedByObjective = quest.POIs.reduce((acc, poi) => {
      const key = poi.objective;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(poi);
      return acc;
    }, {} as Record<number, POI[]>);

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

  constructQuestGivers(quest: Questform) {
    if (!quest.questGivers) {
      return [''];
    }

    const returnCode: string[] = [];
    const methodMapping = {
      creaturetrue: '.Questgiver.addCreatureStarter',
      creaturefalse: '.Questgiver.addCreatureEnder',
      objecttrue: '.Questgiver.addObjectStarter',
      objectfalse: '.Questgiver.addObjectEnder',
    };

    quest.questGivers.forEach((questGiver) => {
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

  constructFactions(quest: Questform) {
    const faction = quest.faction;

    if (!faction) {
      return '';
    }

    let factionCode = faction.toUpperCase();
    if (factionCode === 'NEUTRAL') factionCode = 'ALL';

    return `
      .RaceMask.${factionCode}.set(true)`;
  }

  constructLevel(quest: Questform) {
    const level = quest.level;

    if (level === undefined) return '';

    return `
      .QuestLevel.set(${level})`;
  }

  constructLevelRequired(quest: Questform) {
    const levelRequired = quest.levelRequired;

    return levelRequired === undefined
      ? ''
      : `
      .MinLevel.set(${levelRequired})`;
  }

  constructFlags(quest: Questform): string[] {
    const { flags } = quest;

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

  constructGroupSize(titleVar: string, quest: Questform) {
    const groupSize = quest.groupSize;

    return groupSize === undefined
      ? ''
      : `
${titleVar}.row.SuggestedGroupNum.set(${groupSize})`;
  }

  constructDifficulty(quest: Questform) {
    const difficulty = quest.difficulty;

    return difficulty === undefined
      ? ''
      : `
      .Rewards.Difficulty.set(${difficulty})`;
  }

  constructAreaSort(quest: Questform) {
    const areaSort = quest.areaSort;
    return areaSort === undefined || areaSort === ''
      ? ''
      : `
      .AreaSort.set(${areaSort})`;
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
