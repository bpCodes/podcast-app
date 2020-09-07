import {getWeekDay, humanDuration, WeekDayEnum} from './dateTimeHelper';

describe('dateTimeHelper', function () {
  describe('#getWeekDay()', function () {
    test.each`
      date                                    | expected
      ${new Date('2020-09-05T03:42:14.222Z')} | ${WeekDayEnum.Friday}
      ${new Date('2020-09-06T03:42:14.222Z')} | ${WeekDayEnum.Saturday}
      ${new Date('2020-09-07T03:42:14.222Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2020-09-08T03:42:14.222Z')} | ${WeekDayEnum.Monday}
      ${new Date('2020-09-09T03:42:14.222Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2020-09-10T03:42:14.222Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2020-09-11T03:42:14.222Z')} | ${WeekDayEnum.Thursday}
    `(' should return $expected for the given date', ({ date, expected }) => {
      expect(getWeekDay(date)).toBe(expected);
    });
  });
  describe('#humanDuration()', function () {
    it('should return the duration', () => {
      expect(humanDuration('03:13:08')).toBe('3hrs. 13min');
    });
  });
});
