export interface ItemForm {
  name?: string;
  moduleName?: string;
  type?: string;
  quality?: string;
  itemLevel?: number;
  requiredLevel?: number;
  displayID?: string;
  bonding?: string;
  flavorText?: string;
  maxStack?: number;
  price?: Price;
  weaponDetails?: WeaponDetails;
  armorDetails?: ArmorDetails;
}

interface Price {
  sellPrice: number;
  buyPrice: number;
}

export interface WeaponDetails {
  subType?: string;
  durability?: number;
  school?: string;
  schoolMin?: number;
  schoolMax?: number;
  material?: string;
  delay?: number;
  mainHandOnly?: boolean;
}

export interface ArmorDetails {
  type?: string;
  slot?: string;
  armor?: number;
  durability?: number;
}
