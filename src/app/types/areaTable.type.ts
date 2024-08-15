export interface AreaTableRoot {
  areaTable: AreaTable[];
}

interface AreaTable {
  ID: number;
  ContinentID: number;
  ParentAreaID: number;
  AreaBit: number;
  Flags: number;
  SoundProviderPref: number;
  SoundProviderPrefUnderwater: number;
  AmbienceID: number;
  ZoneMusic: number;
  IntroSound: number;
  ExplorationLevel: number;
  AreaName_Lang_enUS: string;
  AreaName_Lang_enGB: string;
  AreaName_Lang_koKR: string;
  AreaName_Lang_frFR: string;
  AreaName_Lang_deDE: string;
  AreaName_Lang_enCN: string;
  AreaName_Lang_zhCN: string;
  AreaName_Lang_enTW: string;
  AreaName_Lang_zhTW: string;
  AreaName_Lang_esES: string;
  AreaName_Lang_esMX: string;
  AreaName_Lang_ruRU: string;
  AreaName_Lang_ptPT: string;
  AreaName_Lang_ptBR: string;
  AreaName_Lang_itIT: string;
  AreaName_Lang_Unk: string;
  AreaName_Lang_Mask: number;
  FactionGroupMask: number;
  LiquidTypeID_1: number;
  LiquidTypeID_2: number;
  LiquidTypeID_3: number;
  LiquidTypeID_4: number;
  MinElevation: number;
  Ambient_Multiplier: any;
  Lightid: number;
}
