import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConstantSettings } from './app-constants.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OpenWeatherApiService {
    apiSettings: any = {};
    constructor(private http: Http) { 
        this.apiSettings = new AppConstantSettings();
    }
    params:any = {};
    
    getCityDetails() {
        let paramsCitiesDetails: any = {};
        paramsCitiesDetails.id = this.apiSettings.openweather_city_id;
        paramsCitiesDetails.units = this.apiSettings.openweather_units;
        paramsCitiesDetails.APPID = this.apiSettings.openweather_API_KEY;
        return this.http.get('http://api.openweathermap.org/data/2.5/group?', { search: paramsCitiesDetails })
         .map((response: Response) => response.json())
         .catch((response: Response) => response.json());
    }

    getCityWeatherInfo(params) {
        let paramsCityInfo:any = {};
        paramsCityInfo.id = params.id;
        paramsCityInfo.cnt = params.cnt;
        paramsCityInfo.units = this.apiSettings.openweather_units;
        paramsCityInfo.APPID = this.apiSettings.openweather_API_KEY;
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast?', { search: paramsCityInfo })
         .map((response: Response) => response.json())
         .catch((response: Response) => response.json());
    }
}
