import {Reminder} from './reminder';

export interface CalendarDay {
  day: number;
  isActualMonth: boolean;
  reminders?: Reminder[];
}
