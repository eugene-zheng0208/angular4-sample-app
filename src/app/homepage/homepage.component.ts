import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {OpenWeatherApiService} from '../services/openweather-api.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';

import {ViewEncapsulation} from '@angular/core';

import { TempconverterPipe } from '../pipes/temp-converter.pipe';
import { SpeedConverterPipe } from '../pipes/speed-converter.pipe';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  //cityId: string = '';
  cityWeatherData: any = [];
  constructor(private weatherService: OpenWeatherApiService,private router:Router) { }

  /**
   * @name ngOnInit
   * @description 
   *   This function is called when component is initiated. we set some default data for service call
   *   and make service call to weather api and sends response to loadAreas method. 
   * */
  ngOnInit() {
   this.weatherService.getCityDetails().subscribe(
      (response: Response) => {
        this.loadAreas(response);
      }, error => {
          document.write('Service Error');
      }
    );
  }
  
  /**
   * @name gotoCityInfo
   * @description 
   *   This function is called when user wants to navigate to weather info page.It gets cityid passed from html. 
   * */
  gotoCityInfo(cityId){
    this.router.navigate(['/cityinfo/'+cityId]);
  }
  
  /**
   * @name loadAreas
   * @description 
   *   This function is used to assign data for view. 
   * */
  loadAreas(datas) {
      this.cityWeatherData = datas.list;
  }

}
