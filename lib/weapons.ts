import { WeaponAbility } from '../models/WeaponAbilities';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const weaponsDirectory = path.join(process.cwd(), 'data/rules/weapons');

export function getWeaponAbilitiesData() {
  const fileNames = fs.readdirSync(weaponsDirectory);

  const allWeaponsData = Object.fromEntries(
    fileNames.map((fileName) => {
      // Remove ".txt" from file name to get id
      const abilityId = fileName.replace(/\.txt$/, '').toLowerCase();

      const fullPath = path.join(`${weaponsDirectory}`, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const lines = fileContents.split('\n');

      let lineIndex = 0;
      const name = lines[lineIndex];

      //parse description
      const descriptionLines = _.reject(lines, (line, index) => index === 0);

      return [name, descriptionLines.join(' ')];
    })
  );

  return allWeaponsData;
}
