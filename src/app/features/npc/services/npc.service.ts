import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NPCForm, NPCPrimaryFlags } from '../../../types/npcForm.type';
import { NpcFlags } from '../classes/npc-flags';

@Injectable({
  providedIn: 'root',
})
export class NpcService {
  public npcValues = new BehaviorSubject<NPCForm>({});

  getNPCValues() {
    return this.npcValues.asObservable();
  }

  constructor() {}

  setNPCValues(values: NPCForm) {
    this.npcValues.next(values);
    console.log(values);
  }

  constructCode() {
    const name = this.npcValues.value.name;
    const moduleName = this.npcValues.value.moduleName;
    const subName = this.constructSubName();
    const level = this.constructLevel();
    const unitClass = this.constructClass();
    const rank = this.constructRank();
    const type = this.constructType();
    const faction = this.constructFaction();
    const family = this.constructFamily();
    const damageSchool = this.constructDamageSchool();

    const flags = this.constructFlags();

    if (!name) return '';

    return `export const ${name
      .split(' ')
      .join('_')
      .toUpperCase()} = std.CreatureTemplates.create('${moduleName}', '${name
      .split(' ')
      .join('-')
      .toUpperCase()}') ${subName}${level}${unitClass}${rank}${type}${faction}${family}${damageSchool}${flags}`;
  }

  constructName() {
    return `
    .Name.enGB.set("${this.npcValues.value.name}")`;
  }

  constructSubName() {
    return `
    .Subname.enGB.set("${this.npcValues.value.subname}")`;
  }

  constructLevel() {
    return `
    .Level.set(${this.npcValues.value.minLevel}, ${this.npcValues.value.maxLevel})`;
  }

  constructClass() {
    return `
    .UnitClass.${this.npcValues.value.class}.set()`;
  }

  constructRank() {
    return `
    .Rank.${this.npcValues.value.rank}.set()`;
  }

  constructType() {
    return `
    .Type.${this.npcValues.value.type}.set()`;
  }

  constructFaction() {
    if (this.npcValues.value.type === 'BEAST') return '';

    return `
    .FactionTemplate.${this.npcValues.value.factionTemplate}.set()`;
  }

  constructFamily() {
    if (this.npcValues.value.type !== 'BEAST') return '';

    return `
    .Family.${this.npcValues.value.family}.set()`;
  }

  constructDamageSchool() {
    return `
    .DamageSchool.${this.npcValues.value.damageSchool}.set()`;
  }

  constructFlags() {
    if (
      !this.npcValues.value.primaryFlags ||
      !this.npcValues.value.secondaryFlags
    )
      return '';

    const flags = new NpcFlags(
      this.npcValues.value.primaryFlags,
      this.npcValues.value.secondaryFlags
    );
    const returnCode = flags.constructAllFlags();

    return returnCode;
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.constructCode());
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
