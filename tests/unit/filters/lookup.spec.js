import { lookup } from '@/filters/filters';

describe('lookup`', () => {
  describe('given `legal``', () => {
    it('returns string `Legal`', () => {
      expect(lookup('legal')).toBe('Legal');
    });
  });
});
