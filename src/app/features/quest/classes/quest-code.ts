import { CodeCreator } from '../../../shared/classes/code-creator';
import { ExportOptions } from '../../../types/exportOptions.type';
import { NPCForm } from '../../../types/npcForm.type';
import { POI, Questform } from '../../../types/questform.type';

export class QuestCode extends CodeCreator {
  override values!: Questform;
  override exportOptions!: ExportOptions;

  // Due to quests having the ability to be chained, importSTD will not be checked here

  constructor(values: Questform, exportOptions: ExportOptions) {
    super(values, exportOptions);

    this.values = values;
    this.exportOptions = exportOptions;
  }

  override constructCode(): string {
    const title = this.values.title;
    if (!title) return '';

    const objectives = this.constructObjectives();
    const comments = this.constructComments();
    const moduleName = this.values.moduleName;
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
    const areaSort = this.constructAreaSort();
    const exportKeyword = this.exportOptions.includeExport ? 'export' : '';

    return `${comments}${exportKeyword} const ${title
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
      .join('')} ${difficulty} ${areaSort}
      .Name.enGB.set('${title}'); ${groupSize}`;
  }

  private constructComments() {
    const designerComments = this.values.designerComments;
    if (!designerComments || designerComments === '') return '';

    return `/*
${designerComments}
*/
`;
  }

  private constructObjectives() {
    const objectiveObj = this.values.objectives;
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

  private constructTextContent() {
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
      const textValue = this.values[type as keyof Questform];
      if (textValue) {
        returnCode.push(`
      ${method}(\`${textValue}\`)`);
      }
    });

    return returnCode;
  }

  private constructPOIs() {
    if (!this.values.POIs) {
      return [];
    }

    const returnCode: string[] = [];

    const groupedByObjective = this.values.POIs.reduce((acc, poi) => {
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

  private constructQuestGivers() {
    if (!this.values.questGivers) {
      return [''];
    }

    const returnCode: string[] = [];
    const methodMapping = {
      creaturetrue: '.Questgiver.addCreatureStarter',
      creaturefalse: '.Questgiver.addCreatureEnder',
      objecttrue: '.Questgiver.addObjectStarter',
      objectfalse: '.Questgiver.addObjectEnder',
    };

    this.values.questGivers.forEach((questGiver) => {
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

  private constructFactions() {
    const faction = this.values.faction;

    if (!faction) {
      return '';
    }

    let factionCode = faction.toUpperCase();
    if (factionCode === 'NEUTRAL') factionCode = 'ALL';

    return `
      .RaceMask.${factionCode}.set(true)`;
  }

  private constructLevel() {
    const level = this.values.level;

    if (level === undefined) return '';

    return `
      .QuestLevel.set(${level})`;
  }

  private constructLevelRequired() {
    const levelRequired = this.values.levelRequired;

    return levelRequired === undefined
      ? ''
      : `
      .MinLevel.set(${levelRequired})`;
  }

  private constructFlags(): string[] {
    const { flags } = this.values;

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
      .filter(([_, value]) => value === true)
      .map(
        ([key, value]) => `
      .Flags.${key}.set(${value})`
      );
  }

  private constructGroupSize(titleVar: string) {
    const groupSize = this.values.groupSize;

    return groupSize === undefined
      ? ''
      : `
${titleVar}.row.SuggestedGroupNum.set(${groupSize});`;
  }

  private constructDifficulty() {
    const difficulty = this.values.difficulty;

    return difficulty === undefined
      ? ''
      : `
      .Rewards.Difficulty.set(${difficulty})`;
  }

  private constructAreaSort() {
    const areaSort = this.values.areaSort;
    return areaSort === undefined || areaSort === ''
      ? ''
      : `
      .AreaSort.set(${areaSort})`;
  }

  private formatID(ID: string) {
    return /^\d+$/.test(ID) ? ID : `${ID}.ID`;
  }
}
