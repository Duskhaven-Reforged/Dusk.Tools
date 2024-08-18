import { CodeCreator } from '../../../shared/classes/code-creator';
import { ExportOptions } from '../../../types/exportOptions.type';
import { NPCForm } from '../../../types/npcForm.type';
import { Questform } from '../../../types/questform.type';
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

    const flags = this.constructFlags();

    if (!name) return '';

    return `${imports}${designerComments}${exportKeyword} const ${name
      .split(' ')
      .join('_')
      .toUpperCase()} = std.CreatureTemplates.create('${moduleName}', '${name
      .split(' ')
      .join('-')
      .toUpperCase()}') ${subName}${level}${unitClass}${rank}${type}${faction}${family}${damageSchool}${flags}${gossipMenu}`;
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
}
