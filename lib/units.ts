import fs from 'fs';
import path from 'path';
import {
  Ability,
  MeleeStats,
  RangedStats,
  Stat,
  StatType,
  Unit,
  UnitPointsData,
  WeaponSpecialRules,
  WeaponStat,
  WeaponType,
} from '../models/Unit';
import { Faction } from '../models/Faction';
import _, { last } from 'lodash';
import { WeaponAbility } from '../models/WeaponAbilities';

const dataDirectory = path.join(process.cwd(), 'data');
const unitsDirectory = path.join(dataDirectory, 'units');
const UnitStatTypes = ['M', 'T', 'SV', 'W', 'LD', 'OC'];
const STAT_COUNT = 6;

export const RANGED_WEAPON_IDENTIFIER = 'RANGED WEAPONS RANGE A BS S AP D';
export const MELEE_WEAPON_IDENTIFIER = 'MELEE WEAPONS RANGE A WS S AP D';
export const FACTION_IDENTIFIER = 'FACTION KEYWORDS:';
export const STAT_LINE_IDENTIFIER = 'M T SV W LD OC';
export const PARTIAL_STAT_LINE_IDENTIFIER = 'T SV W LD OC';
export const INVULNERABLE_SAVE_IDENTIFIER = 'INVULNERABLE SAVE';
export const WARGEAR_OPTIONS_IDENTIFIER = 'WARGEAR OPTIONS';
export const UNIT_COMPOSITION_IDENTIFIER = 'UNIT COMPOSITION';
export const LEADER_IDENTIFIER = 'LEADER';
export const ABILITIES_IDENTINTIFIER = 'ABILITIES';
export const WARGEAR_ABILITIES_IDENTIFIER = 'WARGEAR ABILITIES';

export function getName(lines: string[], lineIndex: number) {
  return {
    name: lines[lineIndex],
    nextLineIndex: lineIndex + 1,
  };
}

export function getKeywords(lines: string[], lineIndex: number) {
  let keywords: string[] = [];
  let nextLineIndex = lineIndex;

  while (
    lines[nextLineIndex] !== RANGED_WEAPON_IDENTIFIER &&
    lines[nextLineIndex] !== MELEE_WEAPON_IDENTIFIER &&
    lines[nextLineIndex] !== ABILITIES_IDENTINTIFIER
  ) {
    // strip off the KEYWORDS: string
    keywords = keywords.concat(
      lines[nextLineIndex]
        .replace('KEYWORDS: ', '')
        .split(/, ?/)
        .filter((value) => value.length > 0)
    );
    nextLineIndex++;
  }
  return {
    keywords,
    nextLineIndex,
  };
}

export function getWeaponSpecialRules(line: string): WeaponSpecialRules[] {
  return line
    .replace('[', '')
    .replace(']', '')
    .split(', ')
    .map((rule) => {
      let id = rule;
      if (id.startsWith('ANTI')) {
        id = 'ANTI';
      }
      return {
        id: id.replace(/ \d/, ''),
        name: rule,
      };
    });
}

export function getWeapons(lines: string[], lineIndex: number) {
  let nextLineIndex = lineIndex;
  let weapons: WeaponStat[] = [];
  while (
    lines[nextLineIndex] !== 'FACTION KEYWORDS:' &&
    lines[nextLineIndex] !== 'ABILITIES'
  ) {
    if (
      lines[nextLineIndex] !== 'RANGED WEAPONS RANGE A BS S AP D' &&
      lines[nextLineIndex] !== 'MELEE WEAPONS RANGE A WS S AP D' &&
      !lines[nextLineIndex].match(/One Shot:/)
    ) {
      let name = '';
      let stats: string[] = [];
      let specialRules: WeaponSpecialRules[] = [];

      // are the stats on a different lines?
      if (lines[nextLineIndex + 1][0] === '[') {
        name = lines[nextLineIndex];
        nextLineIndex++;
        specialRules = getWeaponSpecialRules(lines[nextLineIndex]);
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

        specialRules =
          weaponLineParts.length > 1
            ? getWeaponSpecialRules(weaponLineParts[1])
            : [];
        name = weaponLineParts[0].trim();
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
      line === STAT_LINE_IDENTIFIER || line === PARTIAL_STAT_LINE_IDENTIFIER
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

  const { invulnerableSave } = getInvulnerableSave(lines);
  if (invulnerableSave) {
    unitStats.push({ type: StatType.INV, value: invulnerableSave });
  }
  return { unitStats };
}

export function getInvulnerableSave(lines: string[]) {
  const index = lines.findIndex((line) =>
    line.startsWith(INVULNERABLE_SAVE_IDENTIFIER)
  );
  if (index < 0) {
    return { invulnerableSave: '' };
  }
  return {
    invulnerableSave: lines[index].replace(
      `${INVULNERABLE_SAVE_IDENTIFIER} `,
      ''
    ),
  };
}

export function getWargearOptions(lines: string[]) {
  let nextLineIndex = lines.findIndex(
    (line) => line === WARGEAR_OPTIONS_IDENTIFIER
  );
  if (nextLineIndex < 0) {
    return {
      wargearOptions: [],
    };
  }
  let lastLine = lines.findIndex(
    (line) => line === UNIT_COMPOSITION_IDENTIFIER
  );

  return {
    wargearOptions: lines.slice(nextLineIndex + 1, lastLine),
  };
}

export function getUnitComposition(lines: string[], name: string) {
  const nextLineIndex = lines.findIndex(
    (line) => line === UNIT_COMPOSITION_IDENTIFIER
  );
  if (nextLineIndex < 0) {
    return {
      unitComposition: [],
    };
  }
  const lastLine = lines.findIndex(
    (line, index) =>
      index !== 0 && (line === name || line === LEADER_IDENTIFIER)
  );
  return {
    unitComposition: lines.slice(nextLineIndex + 1, lastLine),
  };
}

export function getLeadership(lines: string[], name: string) {
  let nextLineIndex = lines.findIndex((line) => line === LEADER_IDENTIFIER);
  if (nextLineIndex < 0) {
    return {
      leadership: [],
    };
  }
  let lastLine = lines.findIndex((line, index) => index !== 0 && line === name);

  return {
    leadership: lines.slice(nextLineIndex + 1, lastLine),
  };
}

export function getAbilities(lines: string[]) {
  let nextLineIndex = lines.findIndex(
    (line) => line === ABILITIES_IDENTINTIFIER
  );
  if (nextLineIndex < 0) {
    return {
      abilities: [],
    };
  }
  let lastLine = lines.findIndex(
    (line) =>
      line.startsWith(INVULNERABLE_SAVE_IDENTIFIER) ||
      line === STAT_LINE_IDENTIFIER ||
      line === PARTIAL_STAT_LINE_IDENTIFIER ||
      line === WARGEAR_ABILITIES_IDENTIFIER
  );

  const abilityLines = lines.slice(nextLineIndex + 1, lastLine);

  return {
    abilities: parseAbilities(abilityLines),
  };
}

export function getWargearAbilities(lines: string[]) {
  let nextLineIndex = lines.findIndex(
    (line) => line === WARGEAR_ABILITIES_IDENTIFIER
  );
  if (nextLineIndex < 0) {
    return {
      wargearAbilities: [],
    };
  }
  let lastLine = lines.findIndex(
    (line) =>
      line.startsWith(INVULNERABLE_SAVE_IDENTIFIER) ||
      line === STAT_LINE_IDENTIFIER ||
      line === PARTIAL_STAT_LINE_IDENTIFIER
  );

  const abilityLines = lines.slice(nextLineIndex + 1, lastLine);

  return {
    wargearAbilities: parseAbilities(abilityLines),
  };
}

export const parseAbilities = (lines: string[]) => {
  let nextLineIndex = 0;
  let name = '';
  let description = '';
  const abilities: Ability[] = [];
  while (nextLineIndex < lines.length) {
    if (lines[nextLineIndex].includes(': ')) {
      const nameLine = lines[nextLineIndex].split(': ');
      if (name.length > 0) {
        abilities.push({ name, description });
      }
      name = nameLine[0];
      description = nameLine[1];
    } else {
      description = description.concat(' ').concat(lines[nextLineIndex]);
    }
    nextLineIndex++;
  }
  abilities.push({ name, description });
  return abilities;
};

export function getSortedUnitsData(): Faction[] {
  const factionColorsFile = fs.readFileSync(
    `${dataDirectory}/faction-colors.json`,
    'utf8'
  );
  const factionColors = JSON.parse(factionColorsFile);
  const factionDirectories = fs.readdirSync(unitsDirectory);

  const pointsData = getUnitPointsData();

  // Top level should be faction directories
  const allFactionsData = factionDirectories.map((directory): Faction => {
    const factionName = directory.replace(/\.txt$/, '').toLowerCase();
    const factionId = factionName.replaceAll(' ', '-');
    const fileNames = fs.readdirSync(`${unitsDirectory}/${directory}`);
    const allUnitsData = fileNames.map((fileName): Unit | null => {
      // Remove ".txt" from file name to get id
      const unitId = fileName.replace(/\.txt$/, '').toLowerCase();

      const fullPath = path.join(`${unitsDirectory}/${directory}`, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const lines = fileContents.split('\n');

      let lineIndex = 0;
      try {
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
        const { wargearOptions } = getWargearOptions(lines);
        const { unitComposition } = getUnitComposition(lines, name);
        const { leadership } = getLeadership(lines, name);
        const { abilities } = getAbilities(lines);
        const { wargearAbilities } = getWargearAbilities(lines);
        return {
          id: unitId,
          name,
          points: pointsData.filter((data) => data.id === unitId),
          unitStats,
          weapons,
          keywords,
          wargearOptions,
          unitComposition,
          leadership,
          abilities,
          wargearAbilities,
        };
      } catch (error) {
        console.error(`Error parsing ${fileName}: ${lineIndex} ${error}`);
      }
      return null;
    });
    return {
      id: factionId,
      color: factionColors[factionId],
      name: factionName,
      units: allUnitsData.filter((unit) => unit !== null) as Unit[],
    };
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
