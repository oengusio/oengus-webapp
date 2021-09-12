// Seems trivial for now, but if it needs enhancing, making it well will mean less refactoring

export class TimeZone {
  private _timezone: string|undefined;

  get timeZone(): string {
    if (this._timezone) {
      return this._timezone;
    }
    this._timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this._timezone;
  }
}

export const timeZone = new TimeZone();
