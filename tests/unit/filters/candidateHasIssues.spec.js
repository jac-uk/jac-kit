import { candidateHasIssues } from '@/filters/filters';

describe('given candidate with no issues', () => {
  it('returns string `no`', () => {
    expect(candidateHasIssues({ flags: {} })).toBe('No');
  });
});
