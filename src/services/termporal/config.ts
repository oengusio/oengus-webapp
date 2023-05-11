export const dateTimeFormats = {
  longDate: { dateStyle: 'long' },
  shortDate: { dateStyle: 'short' },
  longMonth: { year: 'numeric', month: 'long' },
  shortTime: { timeStyle: 'short' },
  mediumDateTime: { dateStyle: 'medium', timeStyle: 'short' },
};

export type dateTimeFormatKey = keyof typeof dateTimeFormats;
