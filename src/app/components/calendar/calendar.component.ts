import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Reminder} from 'src/app/interfaces/reminder';
import {CalendarDay} from 'src/app/interfaces/calendar-day';
import {CalendarService} from 'src/app/services/calendar.service';
import {WeatherService} from 'src/app/services/weather.service';
import {MatDialog} from '@angular/material/dialog';
import {ReminderFormComponent} from '../reminder-form/reminder-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<boolean>();
  calendarArr = [];
  DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday'];
  DAYS_IN_WEEK = 7;
  private selectedDate: Date = new Date();

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
  ) {
  }


  ngOnInit(): void {
    this.calendarService.list(new Date())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((reminders: Reminder[]) => {
        reminders.map((reminder: Reminder) => {
          return {
            ...reminder,
            weather: this.getWeather(reminder.city),
          };
        });
        console.log(reminders);
      });

    this.getCalendarGrid(this.selectedDate);
  }

  getWeather(city: string) {
    const x = this.weatherService.getWeatherInformation(city);
    console.log(x);
    return x;
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
    dialogRef.afterClosed().subscribe((result: Reminder) => {
      console.log(result);
    });
  }

  getCalendarGrid(dt: Date) {
    const lastDayPrevMonth = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
    const lastDayActualMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    const firstDayActualMonth = new Date(dt.getFullYear(), dt.getMonth(), 1).getDay();
    let daysArr = Array.from({length: lastDayActualMonth}, (c: CalendarDay, i) => {
      return {
        day: i + 1,
        isActualMonth: true,
      };
    });

    daysArr = this.fillCalendarDays(daysArr, lastDayPrevMonth, firstDayActualMonth);

    while (daysArr.length) {
      this.calendarArr.push(daysArr.splice(0, this.DAYS_IN_WEEK));
    }
  }

  fillCalendarDays(daysArr, lastDayPrevMonth, firstDayActualMonth): [] {
    // Insert days before this month
    let beforeDaysCounter = lastDayPrevMonth;
    for (let i = 0; i < firstDayActualMonth; i++) {
      daysArr.unshift({
        day: beforeDaysCounter,
        isActualMonth: false
      });
      beforeDaysCounter--;
    }
    // Insert days after this month
    const afterDaysCounter = this.DAYS_IN_WEEK - (daysArr.length % this.DAYS_IN_WEEK);
    for (let i = 0; i < afterDaysCounter; i++) {
      daysArr.push({
        day: i + 1,
        isActualMonth: false
      });
    }

    return daysArr;
  }

  setDayClass(day: CalendarDay) {
    return (day.isActualMonth) ? 'actual' : 'not-actual';
  }
}


