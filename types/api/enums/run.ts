export enum RunStatus {
  VALIDATED,
  BONUS,
  BACKUP,
  TODO,
  REJECTED,
}

export enum RunType {
  SINGLE = 'SINGLE',
  RACE = 'RACE',
  COOP = 'COOP',
  COOP_RACE = 'COOP_RACE',
  OTHER = 'OTHER',
  RELAY = 'RELAY',
  RELAY_RACE = 'RELAY_RACE',
}
