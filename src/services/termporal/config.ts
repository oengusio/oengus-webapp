type FormatList = Record<string, Intl.DateTimeFormatOptions>;

export const dateTimeFormats: FormatList = {
  longDate: { dateStyle: 'long' },
  longDateWithWeekday: { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' },
  shortDate: { dateStyle: 'short' },
  shortDateTime: { dateStyle: 'short', timeStyle: 'short' },
  longMonth: { year: 'numeric', month: 'long' },
  shortTime: { timeStyle: 'short' },
  mediumDateTime: { dateStyle: 'medium', timeStyle: 'short' },
};

export type dateTimeFormatKey = keyof typeof dateTimeFormats;
