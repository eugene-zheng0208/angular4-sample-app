import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

//Component Path Declarations
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CityweatherinfoComponent } from './cityweatherinfo/cityweatherinfo.component';

//Services Path Declarations
import {OpenWeatherApiService} from './services/openweather-api.service';

//Pipes Path Declarations
import { TempconverterPipe } from './pipes/temp-converter.pipe';
import { SpeedConverterPipe } from './pipes/speed-converter.pipe';
import { TimeConverterPipe } from './pipes/time-converter.pipe'

// Routes
const appRoutes: Routes =[
  {path:'',component:HomepageComponent},
  {path:'cityinfo/:id',component:CityweatherinfoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CityweatherinfoComponent,
    SpeedConverterPipe,
    TimeConverterPipe,
    TempconverterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [OpenWeatherApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
