import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Reminder} from 'src/app/interfaces/reminder';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {
  reminderForm: FormGroup;
  colorControl = new FormControl('', Validators.required);
  textControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  dateControl = new FormControl('', Validators.required);
  cityControl = new FormControl('', Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Reminder,
              public dialogRef: MatDialogRef<ReminderFormComponent>,
              fb: FormBuilder,
              private calendarService: CalendarService) {
    this.reminderForm = fb.group({
      text: this.textControl,
      color: this.colorControl,
      date: this.dateControl,
      city: this.cityControl
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }


  getColor() {
    return this.colorControl.value;
  }

  onSubmit() {
    // This would be a subscription in a real environment
    this.dialogRef.close(this.calendarService.create(this.reminderForm.value));
  }
}
