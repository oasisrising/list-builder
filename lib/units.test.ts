import { StatType, WeaponStat, WeaponType } from '../models/Unit';
import {
  ABILITIES_IDENTINTIFIER,
  FACTION_IDENTIFIER,
  INVULNERABLE_SAVE_IDENTIFIER,
  MELEE_WEAPON_IDENTIFIER,
  RANGED_WEAPON_IDENTIFIER,
  STAT_LINE_IDENTIFIER,
  getAbilities,
  getInvulnerableSave,
  getKeywords,
  getLeadership,
  getName,
  getStats,
  getUnitComposition,
  getWargearOptions,
  getWeapons,
} from './units';

describe('unit parsing tests', () => {
  describe('getName', () => {
    it('should parse the name', () => {
      const lines = ['name', 'not name'];
      const lineIndex = 0;
      const result = getName(lines, lineIndex);
      expect(result.name).toEqual('name');
      expect(result.nextLineIndex).toEqual(1);
    });
  });
  describe('getKeywords', () => {
    it('should parse keywords', () => {
      const lines = [
        'BROODLORD',
        'KEYWORDS: Infantry, Character, Psyker, Great Devourer, Broodlord',
        ABILITIES_IDENTINTIFIER,
      ];
      const lineIndex = 1;
      const result = getKeywords(lines, lineIndex);
      expect(result.keywords).toEqual([
        'Infantry',
        'Character',
        'Psyker',
        'Great Devourer',
        'Broodlord',
      ]);
      expect(result.nextLineIndex).toEqual(2);
    });
  });
  describe('getWeapons', () => {
    it('should parse ranged weapon of one line', () => {
      const lines = [
        RANGED_WEAPON_IDENTIFIER,
        'Storm bolter [RAPID FIRE 2] 24" 2 2+ 4 0 1',
        FACTION_IDENTIFIER,
      ];
      const lineIndex = 0;
      const expectedWeapon: WeaponStat = {
        name: 'Storm bolter',
        specialRules: [{ name: 'RAPID FIRE 2', id: 'RAPID FIRE' }],
        weaponStats: [
          { type: StatType.RANGE, value: '24"' },
          { type: StatType.A, value: '2' },
          { type: StatType.BS, value: '2+' },
          { type: StatType.S, value: '4' },
          { type: StatType.AP, value: '0' },
          { type: StatType.D, value: '1' },
        ],
        weaponType: WeaponType.Ranged,
      };

      const result = getWeapons(lines, lineIndex);
      expect(result.weapons).toContainEqual(expectedWeapon);
    });

    it('should parse ranged weapon of one line', () => {
      const lines = [
        RANGED_WEAPON_IDENTIFIER,
        'Hunter-killer missile [ONE SHOT] 48" 1 2+ 14 -3 D6',
        'One Shot: The bearer can only shoot with this weapon once per battle.',
        FACTION_IDENTIFIER,
      ];
      const lineIndex = 0;
      const expectedWeapon: WeaponStat = {
        name: 'Hunter-killer missile',
        specialRules: [{ name: 'ONE SHOT', id: 'ONE SHOT' }],
        weaponStats: [
          { type: StatType.RANGE, value: '48"' },
          { type: StatType.A, value: '1' },
          { type: StatType.BS, value: '2+' },
          { type: StatType.S, value: '14' },
          { type: StatType.AP, value: '-3' },
          { type: StatType.D, value: 'D6' },
        ],
        weaponType: WeaponType.Ranged,
      };

      const notExpectedWeapon: WeaponStat = {
        name: 'One Shot: The bearer can only shoot',
        specialRules: [],
        weaponStats: [
          { type: StatType.RANGE, value: 'with' },
          { type: StatType.A, value: 'this' },
          { type: StatType.BS, value: 'weapon' },
          { type: StatType.S, value: 'once' },
          { type: StatType.AP, value: 'per' },
          { type: StatType.D, value: 'battle.' },
        ],
        weaponType: WeaponType.Ranged,
      };

      const result = getWeapons(lines, lineIndex);
      expect(result.weapons).toContainEqual(expectedWeapon);
      expect(result.weapons).not.toContainEqual(notExpectedWeapon);
    });

    it('should parse ranged weapon of one line with no special rules', () => {
      const lines = [
        RANGED_WEAPON_IDENTIFIER,
        'Storm bolter 24" 2 2+ 4 0 1',
        FACTION_IDENTIFIER,
      ];
      const lineIndex = 0;
      const expectedWeapon: WeaponStat = {
        name: 'Storm bolter',
        specialRules: [],
        weaponStats: [
          { type: StatType.RANGE, value: '24"' },
          { type: StatType.A, value: '2' },
          { type: StatType.BS, value: '2+' },
          { type: StatType.S, value: '4' },
          { type: StatType.AP, value: '0' },
          { type: StatType.D, value: '1' },
        ],
        weaponType: WeaponType.Ranged,
      };

      const result = getWeapons(lines, lineIndex);
      expect(result.weapons).toContainEqual(expectedWeapon);
    });

    it('should parse ranged weapon of multiple lines', () => {
      const lines = [
        RANGED_WEAPON_IDENTIFIER,
        'Purifying Flame',
        '[ANTI-INFANTRY 2+, IGNORES COVER, PSYCHIC]',
        '24" 2 2+ 4 0 1',
        FACTION_IDENTIFIER,
      ];
      const lineIndex = 0;
      const expectedWeapon: WeaponStat = {
        name: 'Purifying Flame',
        specialRules: [
          { name: 'ANTI-INFANTRY 2+', id: 'ANTI' },
          { name: 'IGNORES COVER', id: 'IGNORES COVER' },
          { name: 'PSYCHIC', id: 'PSYCHIC' },
        ],
        weaponStats: [
          { type: StatType.RANGE, value: '24"' },
          { type: StatType.A, value: '2' },
          { type: StatType.BS, value: '2+' },
          { type: StatType.S, value: '4' },
          { type: StatType.AP, value: '0' },
          { type: StatType.D, value: '1' },
        ],
        weaponType: WeaponType.Ranged,
      };

      const result = getWeapons(lines, lineIndex);
      expect(result.weapons).toContainEqual(expectedWeapon);
    });
  });
  describe('getStats', () => {
    it('should parse unit stats', () => {
      const lines = [
        'something',
        'something else',
        'another line',
        STAT_LINE_IDENTIFIER,
        '6" 4 2+ 5 6+ 1',
        `${INVULNERABLE_SAVE_IDENTIFIER} 4+`,
      ];
      const expectedStats = [
        { type: StatType.M, value: '6"' },
        { type: StatType.T, value: '4' },
        { type: StatType.SV, value: '2+' },
        { type: StatType.W, value: '5' },
        { type: StatType.LD, value: '6+' },
        { type: StatType.OC, value: '1' },
        { type: StatType.INV, value: '4+' },
      ];
      const result = getStats(lines);

      expect(result.unitStats).toEqual(expectedStats);
    });

    it('should parse unit stats with partial stat line indentifier', () => {
      const lines = [
        'something',
        'something else',
        'another line',
        'T SV W LD OC',
        '6" 4 2+ 5 6+ 1',
      ];
      const expectedStats = [
        { type: StatType.M, value: '6"' },
        { type: StatType.T, value: '4' },
        { type: StatType.SV, value: '2+' },
        { type: StatType.W, value: '5' },
        { type: StatType.LD, value: '6+' },
        { type: StatType.OC, value: '1' },
      ];
      const result = getStats(lines);

      expect(result.unitStats).toEqual(expectedStats);
    });
  });
  describe('getInvlunerableSave', () => {
    it('should parse invulnerable save', () => {
      const lines = [
        'line 1',
        'line 2',
        'where it was destroyed and not within Engagement Range of',
        'any enemy units, with its full wounds remaining.',
        'INVULNERABLE SAVE 4+',
        'M T SV W LD OC',
      ];

      const result = getInvulnerableSave(lines);

      expect(result.invulnerableSave).toEqual('4+');
    });
  });
  describe('getWargearOptions', () => {
    it('parses wargear options', () => {
      const lines = [
        'some line',
        'WARGEAR OPTIONS',
        '■ For every 5 models in this unit, up to 2 Paladins can each have their storm bolter replaced with one of',
        'the following:',
        '◦ 1 incinerator',
        '◦ 1 psilencer',
        '◦ 1 psycannon',
        '■ 1 Paladin equipped with a storm bolter and Nemesis force weapon can be equipped with 1 Ancient’s',
        'banner. That model’s storm bolter can be replaced with one of the following:',
        '◦ 1 incinerator',
        '◦ 1 psilencer',
        '◦ 1 psycannon',
        'UNIT COMPOSITION',
      ];

      const result = getWargearOptions(lines);
      expect(result.wargearOptions).toStrictEqual([
        '■ For every 5 models in this unit, up to 2 Paladins can each have their storm bolter replaced with one of',
        'the following:',
        '◦ 1 incinerator',
        '◦ 1 psilencer',
        '◦ 1 psycannon',
        '■ 1 Paladin equipped with a storm bolter and Nemesis force weapon can be equipped with 1 Ancient’s',
        'banner. That model’s storm bolter can be replaced with one of the following:',
        '◦ 1 incinerator',
        '◦ 1 psilencer',
        '◦ 1 psycannon',
      ]);
    });
  });
  describe('getUnitComposition', () => {
    it('parses unit composition', () => {
      const lines = [
        'some line',
        'UNIT COMPOSITION',
        '■ 1 Paragon',
        '■ 4-9 Paladins',
        'Every model is equipped with: storm bolter;',
        'Nemesis force weapon.',
        'LEADER',
      ];

      const result = getUnitComposition(lines, 'PALADIN SQUAD');
      expect(result.unitComposition).toStrictEqual([
        '■ 1 Paragon',
        '■ 4-9 Paladins',
        'Every model is equipped with: storm bolter;',
        'Nemesis force weapon.',
      ]);
    });
  });
  describe('getLeadership', () => {
    it('parses leadership info', () => {
      const lines = [
        'some line',
        'Nemesis force sword.',
        'LEADER',
        'This model can be attached to the following units:',
        '■ Brotherhood Terminator Squad',
        '■ Paladin Squad',
        'BROTHER-CAPTAIN STERN',
      ];

      const result = getLeadership(lines, 'BROTHER-CAPTAIN STERN');
      expect(result.leadership).toStrictEqual([
        'This model can be attached to the following units:',
        '■ Brotherhood Terminator Squad',
        '■ Paladin Squad',
      ]);
    });
  });
  describe('getAbilities', () => {
    it('parses abilities', () => {
      const lines = [
        'Grey Knights',
        'ABILITIES',
        'CORE: Deep Strike, Leader',
        'FACTION: Teleport Assault',
        'Exemplar of the Silvered Host: While this model is leading a',
        'unit, each time a model in that unit makes a melee attack, on',
        'a Critical Wound, the target suffers 1 mortal wound in addition',
        'to any normal damage.',
        'Strands of Fate (Psychic): The first time this model is',
        'destroyed, roll one D6 at the end of the phase. On a 2+, set',
        'this model back up on the battlefield as close as possible to',
        'where it was destroyed and not within Engagement Range of',
        'any enemy units, with its full wounds remaining.',
        'INVULNERABLE SAVE 4+',
        'M T SV W LD OC',
      ];

      const result = getAbilities(lines);
      expect(result.abilities).toStrictEqual([
        { name: 'CORE', description: 'Deep Strike, Leader' },
        { name: 'FACTION', description: 'Teleport Assault' },
        {
          name: 'Exemplar of the Silvered Host',
          description:
            'While this model is leading a unit, each time a model in that unit makes a melee attack, on a Critical Wound, the target suffers 1 mortal wound in addition to any normal damage.',
        },
        {
          name: 'Strands of Fate (Psychic)',
          description:
            'The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.',
        },
      ]);
    });
  });
});
