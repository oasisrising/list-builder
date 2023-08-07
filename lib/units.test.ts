import { StatType, WeaponStat, WeaponType } from '../models/Unit';
import {
  FACTION_IDENTIFIER,
  RANGED_WEAPON_IDENTIFIER,
  STAT_LINE_IDENTIFIER,
  getInvulnerableSave,
  getKeywords,
  getName,
  getStats,
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
        'KEYWORDS: Infantry, Character, Psyker, Terminator, Imperium,',
        'Brother-Captain',
        RANGED_WEAPON_IDENTIFIER,
      ];
      const lineIndex = 0;
      const result = getKeywords(lines, lineIndex);
      expect(result.keywords).toEqual([
        'Infantry',
        'Character',
        'Psyker',
        'Terminator',
        'Imperium',
        'Brother-Captain',
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
});