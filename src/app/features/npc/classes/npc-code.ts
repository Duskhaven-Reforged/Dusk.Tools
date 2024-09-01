import { CodeCreator } from '../../../shared/classes/code-creator';
import { formatID } from '../../../shared/utils/utils';
import { ExportOptions } from '../../../types/exportOptions.type';
import {
  NPCCopyModel,
  NPCForm,
  VisualModel,
} from '../../../types/npcForm.type';
import { NpcFlags } from './npc-flags';

export class NpcCode extends CodeCreator {
  override values!: NPCForm;
  override exportOptions!: ExportOptions;

  constructor(values: NPCForm, exportOptions: ExportOptions) {
    super(values, exportOptions);

    this.values = values;
    this.exportOptions = exportOptions;
  }

  override constructCode(): string {
    const name = this.values.name;
    const moduleName = this.values.moduleName;
    const subName = this.constructSubName();
    const level = this.constructLevel();
    const unitClass = this.constructClass();
    const rank = this.constructRank();
    const type = this.constructType();
    const faction = this.constructFaction();
    const family = this.constructFamily();
    const damageSchool = this.constructDamageSchool();
    const imports = this.constructImports();
    const gossipMenu = this.constructGossipMenu();
    const exportKeyword = this.exportOptions.includeExport ? 'export' : '';
    const designerComments = this.constructComments();
    const nameKeyword = this.constructConst();
    const models = this.constructModels(nameKeyword);
    const loot = this.constructLoot();

    const flags = this.constructFlags();

    if (!name) return '';

    return `${imports}${designerComments}${exportKeyword} const ${nameKeyword} = std.CreatureTemplates.create('${moduleName}', '${name
      .split(' ')
      .join('-')
      .toUpperCase()}') ${this.constructName()} ${subName}${level}${unitClass}${rank}${type}${faction}${family}${damageSchool}${flags}${gossipMenu}${loot}${
      models.visualCode
    }${models.copyCode}`;
  }

  private constructConst() {
    return this.values.name?.split(' ').join('_').toUpperCase();
  }

  private constructName() {
    return `
    .Name.enGB.set('${this.values.name}')`;
  }

  private constructSubName() {
    return `
    .Subname.enGB.set("${this.values.subname}")`;
  }

  private constructLevel() {
    return `
    .Level.set(${this.values.minLevel}, ${this.values.maxLevel})`;
  }

  private constructClass() {
    return `
    .UnitClass.${this.values.class}.set()`;
  }

  private constructRank() {
    return `
    .Rank.${this.values.rank}.set()`;
  }

  private constructType() {
    return `
    .Type.${this.values.type}.set()`;
  }

  private constructFaction() {
    if (this.values.type === 'BEAST') return '';

    return `
    .FactionTemplate.${this.values.factionTemplate}.set()`;
  }

  private constructGossipMenu() {
    return this.values.primaryFlags?.gossip === true
      ? `
    .Gossip.modNew((gos) => { gos.Text.add({ enGB: \`${this.values.gossipMenu}\` }) })`
      : '';
  }

  private constructFamily() {
    if (this.values.type !== 'BEAST') return '';

    return `
    .Family.${this.values.family}.set()`;
  }

  private constructDamageSchool() {
    return `
    .DamageSchool.${this.values.damageSchool}.set()`;
  }

  private constructComments() {
    return this.values.designerComments !== ''
      ? `/*
  ${this.values.designerComments}
*/
`
      : '';
  }

  private constructFlags() {
    if (!this.values.primaryFlags || !this.values.secondaryFlags) return '';

    const flags = new NpcFlags(
      this.values.primaryFlags,
      this.values.secondaryFlags
    );
    const returnCode = flags.constructAllFlags();

    return returnCode;
  }

  private constructModels(exportName?: string) {
    if (!this.values.models || !exportName)
      return { copyCode: '', visualCode: '' };

    const npcModels = this.values.models.filter(
      (model): model is NPCCopyModel => 'npcID' in model
    );
    const visualModels = this.values.models.filter(
      (model): model is VisualModel => 'visualID' in model
    );

    return {
      copyCode: npcModels
        .map(
          (model) => `
${exportName}.Models.copyFrom(std.CreatureTemplates.load(${model.npcID}).Models)`
        )
        .join(''),
      visualCode: visualModels.map(
        (model) => `
    .Models.addIds(${model.visualID})`
      ),
    };
  }

  private constructLoot() {
    if (!this.values.loot) return '';

    const lootItemCode = this.values.loot.map(
      (item) =>
        `E.addItem(${formatID(item.itemID)}, ${item.minDropAmount}, ${
          item.maxDropAmount
        })`
    ).join(`
      `);

    return `
    .NormalLoot.modRef((E) => {
      ${lootItemCode}
    })`;
  }
}
