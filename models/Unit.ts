export interface Unit {
  id: string;
  name: string;
  unitStats: Stat[];
  points: UnitPointsData[];
  weapons: WeaponStat[];
}

export interface Stat {
  type: StatType;
  value: string;
}

export enum WeaponType {
  Melee = 'Melee',
  Ranged = 'Ranged',
}

export interface WeaponStat {
  weaponType: WeaponType;
  name: string;
  specialRules: string[];
  weaponStats: Stat[];
}

export interface UnitPointsData {
  id: string;
  modelCount: number;
  points: number;
}

export interface RosterUnit {
  unit: Unit;
  count: number;
}

export enum StatType {
  T = 'T',
  SV = 'SV',
  W = 'W',
  LD = 'LD',
  M = 'M',
  OC = 'OC',
  RANGE = 'RANGE',
  A = 'A',
  BS = 'BS',
  WS = 'WS',
  S = 'S',
  AP = 'AP',
  D = 'D',
}

export const statDescriptions: Record<StatType, string> = {
  [StatType.T]: 'Toughness',
  [StatType.SV]: 'Saving Throw',
  [StatType.W]: 'Wounds',
  [StatType.LD]: 'Leadership',
  [StatType.M]: 'Movement',
  [StatType.OC]: 'Objective Control',
  [StatType.A]: 'Attacks',
  [StatType.RANGE]: 'Range',
  [StatType.BS]: 'Ballistic Skill',
  [StatType.WS]: 'Weapon Skill',
  [StatType.S]: 'Strength',
  [StatType.AP]: 'Armour Piercing',
  [StatType.D]: 'Damage',
};

export const RangedStats = [
  StatType.RANGE,
  StatType.A,
  StatType.BS,
  StatType.S,
  StatType.AP,
  StatType.D,
];

export const MeleeStats = [
  StatType.RANGE,
  StatType.A,
  StatType.WS,
  StatType.S,
  StatType.AP,
  StatType.D,
];
