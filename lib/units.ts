import fs from 'fs';
import path from 'path';
import {
  MeleeStats,
  RangedStats,
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
      const name = lines[lineIndex];
      lineIndex++;

      //parse keywords
      let keywords = '';
      while (lines[lineIndex] !== 'RANGED WEAPONS RANGE A BS S AP D') {
        keywords = keywords.concat(lines[lineIndex]);
        lineIndex++;
      }

      // parse weapons
      let weapons: WeaponStat[] = [];
      while (lines[lineIndex] !== 'FACTION KEYWORDS:') {
        if (
          lines[lineIndex] !== 'RANGED WEAPONS RANGE A BS S AP D' &&
          lines[lineIndex] !== 'MELEE WEAPONS RANGE A WS S AP D'
        ) {
          let name = '';
          let stats = [];
          let specialRules = [];

          // are the stats on a different lines?
          if (lines[lineIndex + 1][0] === '[') {
            name = lines[lineIndex];
            lineIndex++;
            specialRules = [lines[lineIndex]];
            lineIndex++;
            stats = lines[lineIndex].split(' ');
          } else {
            let weaponLineParts = lines[lineIndex].split(' ');

            stats = weaponLineParts.slice(
              weaponLineParts.length - STAT_COUNT,
              weaponLineParts.length
            );

            weaponLineParts = _.difference(weaponLineParts, stats);
            const weaponNameAndSpecialRules = weaponLineParts.join(' ');

            weaponLineParts = weaponNameAndSpecialRules.split(/[\[\]]/);

            (specialRules =
              weaponLineParts.length > 1 ? [weaponLineParts[1]] : []),
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
        lineIndex++;
      }

      // advance to unit stats
      let statLineIndex = lines.findIndex((line) => line === 'M T SV W LD OC');
      if (statLineIndex >= 0) {
        statLineIndex++;
      }
      return {
        id: unitId,
        name: name,
        points: pointsData.filter((data) => data.id === unitId),
        unitStats: lines[statLineIndex].split(' ').map((value, index) => {
          return {
            type: UnitStatTypes[index] as StatType,
            value,
          };
        }),
        weapons: weapons,
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
