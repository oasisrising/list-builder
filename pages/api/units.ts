// This isn't used by anything.

import { getSortedUnitsData } from '../../lib/units';

export default function handler(req, res) {
  res.status(200).json({ data: getSortedUnitsData() });
}
