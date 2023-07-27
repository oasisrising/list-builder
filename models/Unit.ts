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

// export const getUnit = (): Unit => {
//   return {
//     name: 'Kaldor Draigo',
//     unitStats: [
//       {
//         type: StatType.M,
//         value: '5"',
//       },
//       { type: StatType.T, value: '5' },
//       { type: StatType.SV, value: '2+' },
//       { type: StatType.W, value: '7' },
//       { type: StatType.LD, value: '6+' },
//       { type: StatType.OC, value: '1' },
//     ],
//     weapons: [
//       {
//         weaponType: WeaponType.Ranged,
//         name: 'Scourging',
//         specialRules: ['ANTI-DAEMON 2+', 'IGNORES COVER', 'PSYCHIC'],
//         weaponStats: [
//           { type: StatType.RANGE, value: '18"' },
//           { type: StatType.A, value: '3' },
//           { type: StatType.BS, value: '2+' },
//           { type: StatType.S, value: '6' },
//           { type: StatType.AP, value: '-2' },
//           { type: StatType.D, value: '2' },
//         ],
//       },
//       {
//         weaponType: WeaponType.Ranged,
//         name: 'Storm Bolter',
//         specialRules: ['RAPID FIRE 2'],
//         weaponStats: [
//           { type: StatType.RANGE, value: '24"' },
//           { type: StatType.A, value: '2' },
//           { type: StatType.BS, value: '2+' },
//           { type: StatType.S, value: '4' },
//           { type: StatType.AP, value: '0' },
//           { type: StatType.D, value: '1' },
//         ],
//       },
//       {
//         weaponType: WeaponType.Melee,
//         name: 'The Titansword',
//         specialRules: ['ANTI-DAEMON 2+', 'PSYCHIC'],
//         weaponStats: [
//           { type: StatType.RANGE, value: 'Melee' },
//           { type: StatType.A, value: '6' },
//           { type: StatType.WS, value: '2+' },
//           { type: StatType.S, value: '8' },
//           { type: StatType.AP, value: '-4' },
//           { type: StatType.D, value: '3' },
//         ],
//       },
//     ],
//     points: 1234,
//   };
// };

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
