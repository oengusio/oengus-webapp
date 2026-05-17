/**
 * temporal-date-time-format.class
 */
import { OwlDateTimeFormats } from '@oengus/angular-datetime-picker';

export const OWL_TEMPORAL_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: null,
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};
