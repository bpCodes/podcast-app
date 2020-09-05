import { getWeekDay } from './dateTimeHelper';

describe('dateTimeHelper', function () {
  describe('#getWeekDay()', function () {
    it('Should return friendly week day', () => {
      const date = new Date('2020-09-05T03:42:14.222Z');

      expect(getWeekDay(date)).toBe('Friday');
    });
  });
});
