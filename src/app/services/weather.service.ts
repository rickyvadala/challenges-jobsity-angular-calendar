import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API_KEY = '16cd3284f4cb59e07b1b0d4d9dc9294c';
  URL = `http://api.openweathermap.org/data/2.5/weather?q=`;

  // URL = `http://api.openweathermap.org/data/2.5/weather?q=CITY&appid=${this.API_KEY}`;

  constructor(private http: HttpClient) {
  }

  getWeatherInformation(city: string) {
    const url = `${this.URL}${city}&appid=${this.API_KEY}`;
    return this.http.get(url);
  }
}
