import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private static reminderId = 0;
  reminders: Reminder[] = [];

  constructor() { }

  create(data: Reminder): Reminder {
    const newReminder: Reminder = data;
    newReminder.reminderId = CalendarService.reminderId;
    this.reminders.push(data);
    CalendarService.reminderId++;
    return newReminder;
  }

  edit(data: Reminder): Reminder {
    return data;
  }

  list(date: Date): Observable<Reminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  delete(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }
}
