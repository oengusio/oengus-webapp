export const durationExport = {
  toHumanReadable(duration: string): string {
    const parsed = Temporal.Duration.from(duration);
    return [
      parsed.hours.toString(10).padStart(2, '0'),
      parsed.minutes.toString(10).padStart(2, '0'),
      parsed.seconds.toString(10).padStart(2, '0'),
    ].join(':');
  },
};
