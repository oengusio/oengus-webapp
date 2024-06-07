export class Availability {
  from: Date;
  to: Date;
  username: string;
}

export interface AvailabilityResponse {
  [key: string]: Availability[];
}
