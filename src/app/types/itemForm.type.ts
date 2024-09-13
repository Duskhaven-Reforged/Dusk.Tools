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
}

interface Price {
  sellPrice: number;
  buyPrice: number;
}
