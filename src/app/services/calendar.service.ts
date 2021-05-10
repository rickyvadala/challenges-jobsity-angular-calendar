import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Reminder} from '../interfaces/reminder';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // private static reminderId = 0;
  // reminders: Reminder[] = [];
  private static reminderId = 3;
  reminders: Reminder[] = [
    {
      reminderId: 0,
      text: 'Buy something',
      dateTime: new Date(),
      color: 'blue',
      city: 'Argentina'
    },
    {
      reminderId: 1,
      text: 'Talk with someone',
      dateTime: new Date(),
      color: 'orange',
      city: 'Argentina'
    },
    {
      reminderId: 2,
      text: 'Go somewhere',
      dateTime: new Date(),
      color: 'green',
      city: 'Argentina'
    }
  ];

  constructor() {
  }

  create(data: Reminder): Reminder {
    const newReminder: Reminder = data;
    newReminder.reminderId = CalendarService.reminderId;
    this.reminders.push(data);
    CalendarService.reminderId++;
    return newReminder;
  }

  edit(data: Reminder, reminderId: number): Reminder {
    const reminder = this.reminders.find(r => r.reminderId === reminderId);
    reminder.text = data.text;
    reminder.color = data.color;
    reminder.dateTime = data.dateTime;
    reminder.city = data.city;
    return data;
  }

  list(date: Date): Observable<Reminder[]> {
    const filteredReminders = this.reminders.filter(r =>
      date.getFullYear() === r.dateTime.getFullYear() && date.getMonth() === r.dateTime.getMonth());
    return of(filteredReminders);
  }

  delete(reminderId: number): boolean {
    this.reminders = this.reminders.filter(r => r.reminderId !== reminderId);
    return true;
  }
}
