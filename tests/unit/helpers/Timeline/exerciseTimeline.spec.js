import exerciseTimeline from '@/helpers/Timeline/exerciseTimeline';

describe('@/helpers/Timeline/exerciseTimeline', () => {

  describe('QT entries', () => {
    describe('when all three dates are available', () => {
      describe('situational judgement', () => {
        it('contains all dates', () => {
          const data = {
            shortlistingMethods: ['situational-judgement-qualifying-test'],
            situationalJudgementTestDate: new Date('Sun Nov 11 2012 08:00:00 GMT+0000 (Greenwich Mean Time)'),
            situationalJudgementTestStartTime: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
            situationalJudgementTestEndTime: new Date('Sun Nov 11 2012 21:00:00 GMT+0000 (Greenwich Mean Time)'),
          };
          expect(exerciseTimeline(data)).toContainEqual({
            date: data.situationalJudgementTestDate,
            dateString: '11 November 2012 - 9:05 am to 9:00 pm',
            entry: 'Situational judgement qualifying test (QT)',
          });
        });
      });
      describe('critical judgement', () => {
        it('contains all dates', () => {
          const data = {
            shortlistingMethods: ['critical-analysis-qualifying-test'],
            criticalAnalysisTestDate: new Date('Sun Nov 11 2012 08:00:00 GMT+0000 (Greenwich Mean Time)'),
            criticalAnalysisTestStartTime: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
            criticalAnalysisTestEndTime: new Date('Sun Nov 11 2012 21:00:00 GMT+0000 (Greenwich Mean Time)'),
          };
          expect(exerciseTimeline(data)).toContainEqual({
            date: data.criticalAnalysisTestDate,
            dateString: '11 November 2012 - 9:05 am to 9:00 pm',
            entry: 'Critical analysis qualifying test (QT)',
          });
        });
      });
      describe('scenario', () => {
        it('contains all dates', () => {
          const data = {
            shortlistingMethods: ['scenario-test-qualifying-test'],
            scenarioTestDate: new Date('Sun Nov 11 2012 08:00:00 GMT+0000 (Greenwich Mean Time)'),
            scenarioTestStartTime: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
            scenarioTestEndTime: new Date('Sun Nov 11 2012 21:00:00 GMT+0000 (Greenwich Mean Time)'),
          };
          expect(exerciseTimeline(data)).toContainEqual({
            date: data.scenarioTestDate,
            dateString: '11 November 2012 - 9:05 am to 9:00 pm',
            entry: 'Scenario test',
          });
        });
      });
    });

    describe('when one of the dates is missing', () => {
      it('contains available dates and null where data is missing', () => {
        const data = {
          shortlistingMethods: ['situational-judgement-qualifying-test'],
          situationalJudgementTestDate: new Date('Sun Nov 11 2012 08:00:00 GMT+0000 (Greenwich Mean Time)'),
          situationalJudgementTestStartTime: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
          situationalJudgementTestEndTime: null,
        };
        expect(exerciseTimeline(data)).toContainEqual({
          date: data.situationalJudgementTestDate,
          dateString: '11 November 2012 - 9:05 am to null',
          entry: 'Situational judgement qualifying test (QT)',
        });
      });
    });

    describe('when all dates are missing', () => {
      it('returns nothing', () => {
        const data = {
          shortlistingMethods: ['scenario-test-qualifying-test'],
        };
        expect(exerciseTimeline(data)).toEqual([]);
      });
    });
  });

  describe('Selection day entry', () => {
    describe('when location and all dates are available', () => {
      it('contains all dates', () => {
        const data = {
          selectionDays: [{
            selectionDayLocation: 'Las Vegas, Nevada',
            selectionDayStart: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
            selectionDayEnd: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
          }],
        };
        expect(exerciseTimeline(data)).toEqual([{
          date: data.selectionDays[0].selectionDayStart,
          dateString: '11 November 2012',
          entry: 'Selection Day - Las Vegas, Nevada',
        }]);
      });
    });
    
    describe('when one of the dates is not available', () => {
      it('contains `undefined` where location is missing', () => {
        const data = {
          selectionDays: [{
            selectionDayStart: new Date('Sun Nov 11 2012 09:05:00 GMT+0000 (Greenwich Mean Time)'),
          }],
        };
        expect(exerciseTimeline(data)).toEqual([{
          date: data.selectionDays[0].selectionDayStart,
          dateString: '',
          entry: 'Selection Day - undefined',
        }]);
      });
    });

    describe('when all dates are not available', () => {
      it('is equal to null', () => {
        const data = {};
        expect(exerciseTimeline(data)).toEqual([]);
      });
    });
  });
});
