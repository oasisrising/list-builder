import { Unit } from './Unit';

export interface Faction {
  id: string;
  color: string;
  name: string;
  units: Unit[];
}
