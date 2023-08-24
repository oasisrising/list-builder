import { getSortedUnitsData } from './units';

describe('all data', () => {
  it('parses', () => {
    expect(getSortedUnitsData).not.toThrowError();
  });
});
