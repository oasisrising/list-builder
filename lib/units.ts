import fs from 'fs';
import path from 'path';
import {
  MeleeStats,
  RangedStats,
  Stat,
  StatType,
  Unit,
  UnitPointsData,
  WeaponStat,
  WeaponType,
} from '../models/Unit';
import { Faction } from '../models/Faction';
import _ from 'lodash';

const unitsDirectory = path.join(process.cwd(), 'data/units');
const UnitStatTypes = ['M', 'T', 'SV', 'W', 'LD', 'OC'];
const STAT_COUNT = 6;

export const RANGED_WEAPON_IDENTIFIER = 'RANGED WEAPONS RANGE A BS S AP D';
export const MELEE_WEAPON_IDENTIFIER = 'MELEE WEAPONS RANGE A WS S AP D';
export const FACTION_IDENTIFIER = 'FACTION KEYWORDS:';
export const STAT_LINE_IDENTIFIER = 'M T SV W LD OC';
export const PARTIAL_STAT_LINE_INDENTIFIER = 'T SV W LD OC';

export function getName(lines: string[], lineIndex: number) {
  return {
    name: lines[lineIndex],
    nextLineIndex: lineIndex + 1,
  };
}

export function getKeywords(lines: string[], lineIndex: number) {
  let keywords = '';
  let nextLineIndex = lineIndex;
  while (lines[nextLineIndex] !== RANGED_WEAPON_IDENTIFIER) {
    keywords = keywords.concat(lines[nextLineIndex]);
    nextLineIndex++;
  }
  return {
    keywords,
    nextLineIndex,
  };
}

export function getWeapons(lines: string[], lineIndex: number) {
  let nextLineIndex = lineIndex;
  let weapons: WeaponStat[] = [];
  while (lines[nextLineIndex] !== 'FACTION KEYWORDS:') {
    if (
      lines[nextLineIndex] !== 'RANGED WEAPONS RANGE A BS S AP D' &&
      lines[nextLineIndex] !== 'MELEE WEAPONS RANGE A WS S AP D' &&
      !lines[nextLineIndex].match(/One Shot:/)
    ) {
      let name = '';
      let stats = [];
      let specialRules = [];

      // are the stats on a different lines?
      if (lines[nextLineIndex + 1][0] === '[') {
        name = lines[nextLineIndex];
        nextLineIndex++;
        specialRules = lines[nextLineIndex]
          .replace('[', '')
          .replace(']', '')
          .split(', ');
        nextLineIndex++;
        stats = lines[nextLineIndex].split(' ');
      } else {
        let weaponLineParts = lines[nextLineIndex].split(' ');

        stats = weaponLineParts.slice(
          weaponLineParts.length - STAT_COUNT,
          weaponLineParts.length
        );

        weaponLineParts = _.difference(weaponLineParts, stats);
        const weaponNameAndSpecialRules = weaponLineParts.join(' ');

        weaponLineParts = weaponNameAndSpecialRules.split(/[\[\]]/);

        (specialRules = weaponLineParts.length > 1 ? [weaponLineParts[1]] : []),
          (name = weaponLineParts[0].trim());
      }

      const isMelee = stats[0] === 'Melee';
      const weaponStatTypes = isMelee ? MeleeStats : RangedStats;
      weapons.push({
        name,
        specialRules,
        weaponStats: stats.map((value, index) => {
          return {
            type: weaponStatTypes[index],
            value,
          };
        }),
        weaponType: isMelee ? WeaponType.Melee : WeaponType.Ranged,
      });
    }
    nextLineIndex++;
  }
  return {
    weapons,
    nextLineIndex,
  };
}

export function getStats(lines: string[]) {
  let unitStats: Stat[] = [];
  let nextLineIndex = lines.findIndex(
    (line) =>
      line === STAT_LINE_IDENTIFIER || line === PARTIAL_STAT_LINE_INDENTIFIER
  );
  if (nextLineIndex >= 0) {
    nextLineIndex++;
  }
  unitStats = lines[nextLineIndex].split(' ').map((value, index) => {
    return {
      type: UnitStatTypes[index] as StatType,
      value,
    };
  });
  return { unitStats };
}

export function getSortedUnitsData(): Faction[] {
  const factionDirectories = fs.readdirSync(unitsDirectory);

  const pointsData = getUnitPointsData();

  // Top level should be faction directories
  const allFactionsData = factionDirectories.map((directory): Faction => {
    const factionId = directory.replace(/\.txt$/, '').toLowerCase();
    const fileNames = fs.readdirSync(`${unitsDirectory}/${directory}`);
    const allUnitsData = fileNames.map((fileName): Unit => {
      // Remove ".txt" from file name to get id
      const unitId = fileName.replace(/\.txt$/, '').toLowerCase();

      const fullPath = path.join(`${unitsDirectory}/${directory}`, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const lines = fileContents.split('\n');

      let lineIndex = 0;
      let result: any = getName(lines, lineIndex);
      const name = result.name;
      lineIndex = result.nextLineIndex;

      //parse keywords
      result = getKeywords(lines, lineIndex);
      const keywords = result.keywords;
      lineIndex = result.nextLineIndex;

      // parse weapons
      result = getWeapons(lines, lineIndex);
      const weapons = result.weapons;
      lineIndex = result.nextLineIndex;

      // advance to unit stats
      const { unitStats } = getStats(lines);

      return {
        id: unitId,
        name,
        points: pointsData.filter((data) => data.id === unitId),
        unitStats,
        weapons,
        keywords: [],
      };
    });
    return { id: factionId, units: allUnitsData };
  });
  return allFactionsData;
}

const pointsDirectory = path.join(process.cwd(), 'data/points');

export function getUnitPointsData(): UnitPointsData[] {
  const fileNames = fs.readdirSync(pointsDirectory);
  const allUnitsData = fileNames.flatMap((fileName) => {
    const fullPath = path.join(pointsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const lines = fileContents.split('\n');
    let lineIndex = 0;
    let unitPointsData: UnitPointsData[] = [];
    while (lineIndex < lines.length) {
      const id = lines[lineIndex];
      lineIndex++;
      while (
        lineIndex < lines.length &&
        !isNaN(parseInt(lines[lineIndex][0]))
      ) {
        const pointsLine = lines[lineIndex].split(' ');
        unitPointsData.push({
          id: id.toLowerCase(),
          modelCount: parseInt(pointsLine[0]),
          points: parseInt(pointsLine[1]),
        });
        lineIndex++;
      }
    }
    return unitPointsData;
  });

  return allUnitsData;
}
