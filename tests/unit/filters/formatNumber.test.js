import { formatNumber } from '@/filters/filters';

describe('formatNumber', () => {
  it('returns a number', () => {
    expect(formatNumber('124000')).toBe('124,000');
  });
  it('formatNumber', () => {
    expect(formatNumber(100)).toEqual('100');
    expect(formatNumber(1000)).toEqual('1,000');
    expect(formatNumber(100000)).toEqual('100,000');
    expect(formatNumber(1000000)).toEqual('1,000,000');
    expect(formatNumber('1000000')).toEqual('1,000,000');
    expect(formatNumber(null)).toEqual(null);
    expect(formatNumber(undefined)).toEqual(undefined);
    expect(formatNumber(0.1274, 2)).toEqual('0.13');
    expect(formatNumber(1001.1274, 2)).toEqual('1001.13');
    expect(formatNumber('1001.1274', 2)).toEqual('1001.13');
    expect(formatNumber(1001, 2)).toEqual('1,001');
  });
});
