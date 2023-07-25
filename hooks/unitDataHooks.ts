import useSWR, { Fetcher } from 'swr';
import { Unit } from '../models/Unit';

// export function useGetAllUnitData() {
//   const { data, error, isLoading } = useSWR('api/units', fetcher);

//   return {
//     allUnitsData: data as Unit[],
//     isLoading,
//     isError: error,
//   };
// }
