import { slugify } from '@/filters/filters';

describe('slugify', () => {
  it('returns string', () => {
    expect(slugify('test')).toBe('test');
  });
});
