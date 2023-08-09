import { Unit } from './Unit';

export interface Faction {
  id: string;
  name: string;
  units: Unit[];
}
