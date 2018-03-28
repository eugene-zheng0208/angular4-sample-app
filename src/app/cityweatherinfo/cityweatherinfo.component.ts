import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { OpenWeatherApiService } from '../services/openweather-api.service';

import { TimeConverterPipe } from '../pipes/time-converter.pipe';
import { TempconverterPipe } from '../pipes/temp-converter.pipe';


@Component({
  selector: 'app-cityweatherinfo',
  templateUrl: './cityweatherinfo.component.html'
})
export class CityweatherinfoComponent implements OnInit {
  cityName: string = '';
  barChartLabels: any = [];
  cityList: any = [];
  // this variable holds the structure in which we have to pass the data for displaying chart
  barChartData:any = [
     {data: [], label: 'Temp Max'},
     {data: [], label: 'Temp Min'}
  ];
  // this variable holds the chart options that need to be sent 
  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //Specifying type of chart
  barChartType:string = 'bar';
  barChartLegend:boolean = true;

  constructor(
      private weatherService: OpenWeatherApiService,
      private router: Router,
      private route:ActivatedRoute
  ) { }
  
  /**
   * @name ngOnInit
   * @description 
   *   This function is called when component is initiated. We are getting id from route
   *   params and and subscribing for the id so when id is changed and we do page
   *   refresh or we refresh the page it will assign active id user intended. 
   * */
  ngOnInit() {
    let cityIdFromUrl: any = '';
    this.route.params.subscribe((param) => {
        cityIdFromUrl = param['id']
    });
    if(cityIdFromUrl){
         this.getWeatherDetails(cityIdFromUrl);
    }else {
        this.router.navigate(['/']);
    }
  }
  /**
   * @name getWeatherDetails
   * @description 
   *   This function gets cityid from ngonitit method and we set some default data for service call
   *   and make service call to weather api and sends response to setData method.
   * */
  getWeatherDetails(data) {
      let apiData: any ={};
      apiData.id = data;
      apiData.cnt = '3'; // count for getting data for next three hour sets
      this.weatherService.getCityWeatherInfo(apiData).subscribe(
          (response: Response) => {
              this.setData(response);
      }, error => {
          document.write('Service Error');
      });
  }
  /**
   * @name setData
   * @description 
   *   This function gets the response after service calls here we set data for chart and UI.
   * */
  setData(res) {
      this.cityName = res.city.name;
      this.cityList = res.list;
      
      let timeConverter = new TimeConverterPipe(); // Time converter for converting time to am/pm
      this.barChartLabels = res.list.map((det)=>{
           return  timeConverter.transform(det.dt_txt);
      });
      // Looping through list and pushing min and max temparature data to chart for chart display.
      res.list.forEach((det)=>{
          this.barChartData[0].data.push(det.main.temp_max);
          this.barChartData[1].data.push(det.main.temp_min);
      });
  }

}
