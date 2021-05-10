import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Reminder} from 'src/app/interfaces/reminder';
import {CalendarDay} from 'src/app/interfaces/calendar-day';
import {CalendarService} from 'src/app/services/calendar.service';
import {WeatherService} from 'src/app/services/weather.service';
import {MatDialog} from '@angular/material/dialog';
import {ReminderFormComponent} from '../reminder-form/reminder-form.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday'];
  DAYS_IN_WEEK = 7;

  onDestroy$ = new Subject<boolean>();

  calendarArr = [];
  daysArr: CalendarDay[] = [];
  selectedDate: Date = new Date();
  reminders: Reminder[];
  selectedDateControl = new FormControl(this.selectedDate, Validators.required);
  selectedDateForm: FormGroup;


  constructor(
    private calendarService: CalendarService,
    private matDialog: MatDialog,
    fb: FormBuilder
  ) {
    this.selectedDateForm = fb.group({
      selectedDate: this.selectedDateControl
    });
  }


  ngOnInit(): void {
    this.getReminders(this.selectedDate);

    this.getCalendarGrid(this.selectedDate);
  }



  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openReminderForm(reminder?: Reminder) {
    const dialogRef = this.matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getReminders(this.selectedDate);
      this.transformArrForHtml(this.setRemindersToCalendar([...this.daysArr]));
    });
  }

  getCalendarGrid(dt: Date) {
    const lastDayPrevMonth: number = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
    const lastDayActualMonth: number = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    const firstDayActualMonth: number = new Date(dt.getFullYear(), dt.getMonth(), 1).getDay();
    this.daysArr = Array.from({length: lastDayActualMonth}, (c: CalendarDay, i) => {
      return {
        day: i + 1,
        isActualMonth: true,
      };
    });

    this.fillCalendarDays(lastDayPrevMonth, firstDayActualMonth);

    this.transformArrForHtml([...this.daysArr]);
  }

  transformArrForHtml(daysArrWithReminders: CalendarDay[]) {
    this.calendarArr = [];
    while (daysArrWithReminders.length) {
      this.calendarArr.push(daysArrWithReminders.splice(0, this.DAYS_IN_WEEK));
    }
  }

  fillCalendarDays(lastDayPrevMonth: number, firstDayActualMonth: number): CalendarDay[] {
    // Insert days before this month
    let beforeDaysCounter = lastDayPrevMonth;
    for (let i = 0; i < firstDayActualMonth; i++) {
      this.daysArr.unshift({
        day: beforeDaysCounter,
        isActualMonth: false
      });
      beforeDaysCounter--;
    }
    // Insert days after this month
    const afterDaysCounter = this.DAYS_IN_WEEK - (this.daysArr.length % this.DAYS_IN_WEEK);
    for (let i = 0; i < afterDaysCounter; i++) {
      this.daysArr.push({
        day: i + 1,
        isActualMonth: false
      });
    }

    return this.setRemindersToCalendar([...this.daysArr]);
  }

  setDayClass(day: CalendarDay) {
    return (day.isActualMonth) ? 'actual' : 'not-actual';
  }

  private setRemindersToCalendar(daysArrWithReminders: CalendarDay[]): CalendarDay[] {
    // Insert reminders on this month
    daysArrWithReminders.forEach(obj => {
      if (obj.isActualMonth) {
        obj.reminders = this.reminders.filter(r => r.dateTime.getDate() === obj.day);
      }
    });
    return daysArrWithReminders;
  }

  private getReminders(dt: Date) {
    this.calendarService.list(dt)
      .subscribe((reminders: Reminder[]) => {
        this.reminders = reminders;
      });

  }
}


