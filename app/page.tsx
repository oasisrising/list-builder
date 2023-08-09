import FactionsDisplay from '../components/FactionsDisplay/FactionsDisplay';
import { getSortedUnitsData } from '../lib/units';
import { getWeaponAbilitiesData } from '../lib/weapons';
import FactionDataProvider from '../providers/FactionDataProvider/FactionDataContext';
import WeaponsDataProvider from '../providers/WeaponDataProvider/WeaponDataContext';

export default async function Factions() {
  return <FactionsDisplay />;
}
