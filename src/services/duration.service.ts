import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  static toHuman(estimate: string): string {
    if (!estimate) {
      return '';
    }

    if (window.Temporal.Duration) {
      const d: Temporal.Duration = window.Temporal.Duration.from(estimate);
      const hours = d.hours.toString().padStart(2, '0');
      const minutes = d.minutes.toString().padStart(2, '0');
      const seconds = d.seconds.toString().padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    }

    console.log('Chrome detected, using moment fallback');

    const duration = moment.duration(estimate);
    const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  static toIso(humanEstimate: string): string {
    if (!humanEstimate) {
      return '';
    }

    if (window.Temporal.Duration) {
      const timeParts = humanEstimate.split(':');
      let duration: Temporal.Duration;

      if (timeParts.length === 3) {
        const [hours, minutes, seconds] = timeParts.map((p) => parseInt(p, 10));
        duration = window.Temporal.Duration.from({hours, minutes, seconds});
      } else {
        const [hours, minutes] = timeParts.map((p) => parseInt(p, 10));
        duration = window.Temporal.Duration.from({hours, minutes, seconds: 0});
      }


      return duration.toString();
    }

    console.log('Chrome detected, using moment fallback');

    // TODO: replace moment with something not moment
    return moment.duration(humanEstimate).toISOString();
  }
}
