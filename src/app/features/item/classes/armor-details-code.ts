import { ArmorDetails } from '../../../types/itemForm.type';

export class ArmorDetailsCode {
  armorDetails: ArmorDetails = {};

  constructor(armorDetails: ArmorDetails) {
    this.armorDetails = armorDetails;
  }

  public constructCode() {
    return `${this.constructType()}${this.constructArmor()}${this.constructDurability()}`;
  }

  private constructType() {
    if (!this.armorDetails.type) return '';

    return `
    .Class.${this.armorDetails.type}_EQUIP.set()
    .Material.${this.armorDetails.type}.set()`;
  }

  private constructArmor() {
    if (!this.armorDetails.armor) return '';

    return `
    .Armor.set(${this.armorDetails.armor})`;
  }

  private constructDurability() {
    if (!this.armorDetails.durability) return '';

    return `
    .Durability.set(${this.armorDetails.durability})`;
  }
}
