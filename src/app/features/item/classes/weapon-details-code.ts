import { WeaponDetails } from '../../../types/itemForm.type';

export class WeaponDetailsCode {
  weaponDetails: WeaponDetails = {};

  constructor(weaponDetails: WeaponDetails) {
    this.weaponDetails = weaponDetails;
  }

  public constructCode() {
    return `${this.constructSubType()}${this.constructSheath()}${this.constructDurability()}${this.constructSchool()}${this.constructMaterial()}${this.constructDelay()}`;
  }

  private constructSubType() {
    if (!this.weaponDetails.subType) return '';

    return `
    .Class.${this.weaponDetails.subType}.set()`;
  }

  private constructSheath() {
    if (!this.weaponDetails.subType) return '';

    const sheathMaps: Record<string, string[]> = {
      ONE_HANDED: ['FIST_WEAPON', 'DAGGER', 'AXE_1H', 'MACE_1H', 'SWORD_1H'],
      TWO_HANDED: ['POLEARM', 'AXE_2H', 'MACE_2H', 'SWORD_2H'],
      STAFF: ['STAFF'],
      SHIELD: ['SHIELD'],
    };

    let sheathKey: string | undefined = undefined;

    for (const key in sheathMaps) {
      if (sheathMaps[key].includes(this.weaponDetails.subType)) sheathKey = key;
    }

    if (sheathKey === undefined) return '';

    return `
    .Sheath.${sheathKey}.set()`;
  }

  private constructDurability() {
    if (!this.weaponDetails.durability) return '';

    return `
    .Durability.set(${this.weaponDetails.durability})`;
  }

  private constructSchool() {
    if (!this.weaponDetails.school) return '';

    return `
    .Damage.${this.weaponDetails.school}(${this.weaponDetails.schoolMin}, ${this.weaponDetails.schoolMax})`;
  }

  private constructMaterial() {
    if (!this.weaponDetails.material) return '';

    return `
    .Material.${this.weaponDetails.material}.set()`;
  }

  private constructDelay() {
    if (!this.weaponDetails.delay) return '';

    return `
    .Delay.setAsMilliseconds(${this.weaponDetails.delay})`;
  }
}
