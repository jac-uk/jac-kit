<<<<<<< HEAD:tests/unit/filters/candidateHasIssues.spec.js
import { candidateHasIssues } from '@/filters/filters';
=======
import { candidateHasIssues } from '@/filters'; 
>>>>>>> no failing tests:tests/unit/filters/candidateHasIssues.xspec.js

describe('given candidate with no issues', () => {
  it('returns string `no`', () => {
    expect(candidateHasIssues({ flags: {} })).toBe('No');
  });
});
