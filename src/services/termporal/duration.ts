export interface DurationParse {
  year: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  error: number;
}

const durationMiniRegex = /^(?<value>\d+)(?<unitSymbol>[YMWDHS])/;

const durationUnitConversion = {
  date: {
    Y: 'year',
    M: 'month',
    W: 'week',
    D: 'day',
    H: 'error',
    S: 'error',
  },
  time: {
    H: 'hour',
    M: 'minute',
    S: 'second',
    Y: 'error',
    W: 'error',
    D: 'error',
  },
};

export const durationExport = {
  toHumanReadable(duration: string): string {
    const parsed = this.parse(duration);
    return [
      parsed.hour.toString(10).padStart(2, '0'),
      parsed.minute.toString(10).padStart(2, '0'),
      parsed.second.toString(10).padStart(2, '0'),
    ].join(':');
  },
  parse(duration: string): DurationParse {
    if (duration[0] !== 'P' || duration.length < 2) {
      throw new Error('Not a duration');
    }
    duration = duration.slice(1);
    const parts: DurationParse = {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      error: 0,
    };
    let isTime = false;
    while (duration.length) {
      if (duration[0] === 'T') {
        isTime = true;
        duration = duration.slice(1);
        continue;
      }
      const match = durationMiniRegex.exec(duration);
      if (match === null) {
        throw new Error('Not a duration');
      }
      const { value, unitSymbol } = match.groups;
      // This... is hideous. This needs to be better.
      (parts as any)[durationUnitConversion[isTime ? 'time' : 'date'][unitSymbol as 'Y'|'M'|'W'|'D'|'H'|'S']] = Number.parseFloat(value);
      duration = duration.slice(match[0].length);
    }
    if (parts.error) {
      throw new Error('Not a duration');
    }
    return parts;
  },
};
