/**
 * temporal-date-time.module
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS } from '@oengus/angular-datetime-picker';
import { TemporalDateTimeAdapter } from './temporal-date-time-adapter.class';
import { OWL_TEMPORAL_DATE_TIME_FORMATS } from './temporal-date-time-format.class';

@NgModule({
  imports: [PlatformModule],
  providers: [
    {provide: DateTimeAdapter, useClass: TemporalDateTimeAdapter},
  ],
})
export class TemporalDateTimeModule {
}

@NgModule({
  imports: [TemporalDateTimeModule],
  providers: [{provide: OWL_DATE_TIME_FORMATS, useValue: OWL_TEMPORAL_DATE_TIME_FORMATS}],
})
export class OwlTemporalDateTimeModule {
}
