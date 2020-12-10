import { formatEstimatedDate } from '@/filters/filters';

describe('formatEstimatedDate', () => {
  it('returns month string', () => {
    expect(formatEstimatedDate(new Date(0))).toBe('January 1970');
  });
});
