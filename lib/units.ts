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

const unitsDirectory = path.join(process.cwd(), 'data/units');
const UnitStatTypes = ['M', 'T', 'SV', 'W', 'LD', 'OC'];

export function getSortedUnitsData(): Unit[] {
  const pointsData = getUnitPointsData();

  // Get file names under /posts
  const fileNames = fs.readdirSync(unitsDirectory);
  const allUnitsData = fileNames.map((fileName) => {
    // Remove ".txt" from file name to get id
    const id = fileName.replace(/\.txt$/, '').toLowerCase();

    // Read markdown file as string
    const fullPath = path.join(unitsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const lines = fileContents.split('\n');

    //parse weapons
    let lineIndex = 2;
    let weapons: WeaponStat[] = [];
    while (lines[lineIndex] != 'ABILITIES') {
      const nameLine = lines[lineIndex].split(' [');
      console.log(nameLine);
      const name = nameLine[0];
      // const specialRules = nameLine[1].split(' ');
      lineIndex++;
      const statLine = lines[lineIndex].split(' ');
      const isMelee = statLine[0] === 'Melee';
      const weaponStatTypes = isMelee ? MeleeStats : RangedStats;
      weapons.push({
        name,
        specialRules: [],
        weaponStats: statLine.map((value, index) => {
          return {
            type: weaponStatTypes[index],
            value,
          };
        }),
        weaponType: isMelee ? WeaponType.Melee : WeaponType.Ranged,
      });

      lineIndex++;
    }

    // Combine the data with the id
    return {
      id: id,
      name: lines[0],
      unitStats: lines[1].split(' ').map((value, index) => {
        return {
          type: UnitStatTypes[index] as StatType,
          value,
        };
      }),
      points: pointsData.filter((data) => data.id === id),
      weapons: weapons,
    };
  });

  // Sort posts by date
  return allUnitsData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else {
      return -1;
    }
  });
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
    console.log(unitPointsData);
    return unitPointsData;
  });

  return allUnitsData;
}
