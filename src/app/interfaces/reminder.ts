export interface Reminder {
  reminderId: number;
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
}
