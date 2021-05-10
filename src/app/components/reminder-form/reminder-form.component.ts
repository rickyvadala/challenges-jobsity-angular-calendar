import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Reminder} from 'src/app/interfaces/reminder';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CalendarService} from '../../services/calendar.service';
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  COLORS = ['blue', 'red', 'yellow', 'green', 'orange', 'violet', 'white', 'black'];

  isUpdate = false;
  reminderForm: FormGroup;
  reminderId = null;
  weather = null;

  colorControl = new FormControl('', Validators.required);
  textControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  dateControl = new FormControl('', Validators.required);
  cityControl = new FormControl('', Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {reminder: Reminder},
              public dialogRef: MatDialogRef<ReminderFormComponent>,
              fb: FormBuilder,
              private calendarService: CalendarService,
              private weatherService: WeatherService) {
    this.reminderForm = fb.group({
      text: this.textControl,
      color: this.colorControl,
      dateTime: this.dateControl,
      city: this.cityControl
    });
  }

  ngOnInit(): void {
    const d = {...this.data};
    if (d && d.reminder) {
      this.getWeather(d.reminder.city);
      this.isUpdate = true;
      this.reminderId = d.reminder.reminderId;
      this.reminderForm.controls.text.setValue(d.reminder.text);
      this.reminderForm.controls.color.setValue(d.reminder.color);
      this.reminderForm.controls.dateTime.setValue(d.reminder.dateTime);
      this.reminderForm.controls.city.setValue(d.reminder.city);
    }
  }
  getWeather(city: string) {
    this.weatherService.getWeatherInformation(city).subscribe((x: any) => {
      this.weather = x.weather[0];
    });
  }

  getColor() {
    return this.colorControl.value;
  }

  onSubmit(type) {
    // This would be a subscription in a real environment
    let action;
    switch (type) {
      case 'create':
        action = this.calendarService.create(this.reminderForm.value);
        break;
      case 'edit':
        action = this.calendarService.edit(this.reminderForm.value, this.reminderId);
        break;
      case 'delete':
        action = this.calendarService.delete(this.reminderId);
        break;
    }
    this.dialogRef.close(action);
  }
}
