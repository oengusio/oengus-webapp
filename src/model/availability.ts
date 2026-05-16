export interface AvailabilityRawApi<DateType = string> {
  from: DateType;
  to: DateType;
  username: string;
}

export type Availability = AvailabilityRawApi<Temporal.ZonedDateTime>;

export type AvailabilityResponseRaw = Record<string, AvailabilityRawApi[]>;
export type AvailabilityResponse = Record<string, Availability[]>;
