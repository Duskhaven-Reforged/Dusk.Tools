import { CodeCreator } from '../../../shared/classes/code-creator';
import { formatID } from '../../../shared/utils/utils';
import { ExportOptions } from '../../../types/exportOptions.type';
import { ItemForm } from '../../../types/itemForm.type';
import { NPCForm } from '../../../types/npcForm.type';
import { Questform } from '../../../types/questform.type';
import { ArmorDetailsCode } from './armor-details-code';
import { WeaponDetailsCode } from './weapon-details-code';

export class ItemCode extends CodeCreator {
  override values!: ItemForm;
  override exportOptions!: ExportOptions;

  constructor(values: ItemForm, exportOptions: ExportOptions) {
    super(values, exportOptions);

    this.values = values;
    this.exportOptions = exportOptions;
  }

  override constructCode() {
    if (!this.values.name) return '';

    const name = this.constructName();
    const nameKeyword = this.constructConst();
    const imports = this.constructImports();
    const exportKeyword = this.exportOptions.includeExport ? 'export' : '';
    const type = this.constructType();
    const quality = this.constructQuality();
    const itemLevel = this.constructItemLevel();
    const requiredLevel = this.constructRequiredLevel();
    const displayID = this.constructDisplayID();
    const bonding = this.constructBonding();
    const flavorText = this.constructFlavorText();
    const price = this.constructPrice();
    const maxStack = this.constructMaxStack();
    const weaponDetailsCode = this.constructWeaponDetails();
    const armorDetailsCode = this.constructArmorDetails();

    return `${imports}${exportKeyword} const ${nameKeyword} = std.Items.create(${
      this.values.moduleName
    }, ${this.values.name
      .split(' ')
      .join('-')
      .toUpperCase()})${type}${quality}${itemLevel}${weaponDetailsCode}${armorDetailsCode}${requiredLevel}${displayID}${bonding}${flavorText}${price}${maxStack}`;
  }

  private constructConst() {
    return this.values.name?.split(' ').join('_').toUpperCase();
  }

  private constructName() {
    return `
    .Name.enGB.set('${this.values.name}')`;
  }

  private constructType() {
    if (!this.values.type) return '';

    if (
      this.values.weaponDetails?.mainHandOnly === true &&
      this.values.type === 'WEAPON'
    )
      return `
    .InventoryType.MAINHAND.set()`;

    if (this.values.armorDetails?.slot && this.values.type === 'ARMOR')
      return `
    .InventoryType.${this.values.armorDetails.slot}.set()`;

    return `
    .InventoryType.${this.values.type}.set()`;
  }

  private constructWeaponDetails() {
    if (this.values.type !== 'WEAPON' || !this.values.weaponDetails) return '';

    return new WeaponDetailsCode(this.values.weaponDetails).constructCode();
  }

  private constructArmorDetails() {
    if (this.values.type !== 'ARMOR' || !this.values.armorDetails) return '';

    return new ArmorDetailsCode(this.values.armorDetails).constructCode();
  }

  private constructQuality() {
    if (!this.values.quality) return '';

    return `
    .Quality.${this.values.quality}.set()`;
  }

  private constructItemLevel() {
    if (!this.values.itemLevel) return '';
    return `
    .ItemLevel.set(${this.values.itemLevel})`;
  }

  private constructRequiredLevel() {
    if (!this.values.requiredLevel || this.values.requiredLevel === 0)
      return '';
    return `
    .RequiredLevel.set(${this.values.requiredLevel})`;
  }

  private constructDisplayID() {
    if (!this.values.displayID) return '';
    return `
    .DisplayInfo.set(std.Items.load(${formatID(
      this.values.displayID
    )}).DisplayInfo.get())`;
  }

  private constructBonding() {
    if (!this.values.bonding) return '';

    return `
    .Bonding.${this.values.bonding}.set()${
      this.values.bonding === 'QUEST_ITEM'
        ? `
    .Flags.HAS_QUEST_GLOW.set(true)`
        : ''
    }`;
  }

  private constructFlavorText() {
    if (!this.values.flavorText) return '';

    return `
    .Description.enGB.set(${this.values.flavorText})`;
  }

  private constructPrice() {
    if (!this.values.price) return '';

    return `
    .Price.set(${this.values.price.sellPrice}, ${this.values.price.buyPrice}, 1)`;
  }

  private constructMaxStack() {
    if (!this.values.maxStack) return '';

    return `
    .MaxStack.set(${this.values.maxStack})`;
  }
}
