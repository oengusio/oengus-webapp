import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  static toHuman(estimate: string | Temporal.Duration): string {
    if (!estimate) {
      return '';
    }

    const d = Temporal.Duration.from(estimate);
    const hours = d.hours.toString().padStart(2, '0');
    const minutes = d.minutes.toString().padStart(2, '0');
    const seconds = d.seconds.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  static toIso(humanEstimate: string): string {
    if (!humanEstimate) {
      return '';
    }

    const timeParts = humanEstimate.split(':');
    let duration: Temporal.Duration;

    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts.map((p) => parseInt(p, 10));
      duration = Temporal.Duration.from({hours, minutes, seconds});
    } else {
      const [hours, minutes] = timeParts.map((p) => parseInt(p, 10));
      duration = Temporal.Duration.from({hours, minutes, seconds: 0});
    }

    return duration.toString();
  }
}
