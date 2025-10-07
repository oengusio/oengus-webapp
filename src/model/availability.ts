export class Availability {
  from: Date;
  to: Date;
  username: string;
}

export type AvailabilityResponse = Record<string, Availability[]>;
