<div align="center">
    <img src="https://storage.googleapis.com/public-jobsity-bucket/jobsity_logo_small.png"/>
</div>

# Angular Challenge

## Resolution

 **DONE** - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 
 **DONE** - Ability to edit reminders - including changing text, city, day and time.
 
 **IN PROGRESS** - Add a weather service call from [OpenWeather](https://openweathermap.org/forecast16) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.
 
 _(The API Key that OpenWeather provided me throws 401 on forecast requests, but works fine on Weather APIs, so each reminder has the weather of the current day, not the forecast)_

  **DONE** - Expand the calendar to support more than the current month or year.
 
 _(Selecting a date from the DATEPICKER on the top of the calendar)_

  **IN PROGRESS** - Properly handle overflow when multiple reminders appear on the same date.
 
 _(The Calendar resizes when it has more than 3 reminders, I put here IN PROGRESS and not DONE, because i had a better solution, but didnt have the time)_


## Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-​end UI products with attention to details, cross-browser compatibility, standards, and  reusability.

## Assignment

The goal of this exercise is to create a demo calendar application using Angular.

You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:
<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandatory features
 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 - Ability to edit reminders - including changing text, city, day and time.
 - Add a weather service call from [OpenWeather](https://openweathermap.org/forecast16) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

## Bonus (Optional)

- Expand the calendar to support more than the current month or year.
- Properly handle overflow when multiple reminders appear on the same date.
- Unit test the functionality: *Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.*

## Considerations

 - The project is completely focused on Front-end. Ignore the Back-end.
 - Create your Calendar using the route `/calendar`
 - Feel free to use small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 - **You must create the calendar component yourself**. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
 - Provide working API keys to any external API you use.
 - Show us your capabilities on CSS and styling, if possible.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
