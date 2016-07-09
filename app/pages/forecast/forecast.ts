import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import{Weather} from '../../providers/weather/weather';
import{TemperaturePipe} from '../../pipes/temperature';
import{WeatherInfoPage} from '../../pages/weather-info/weather-info';
/*
  Generated class for the ForecastPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/forecast/forecast.html',
providers:[Weather],
pipes:[TemperaturePipe]
})
export class ForecastPage {
  
  public cityWeather;
  public forecast=[];
  public days;

  constructor(private nav: NavController, private navParams:NavParams,public weather:Weather ) {
    this.cityWeather=navParams.get('cityWeather');
  this.getFore();
    
    
    
  }
  
  getFore()
  {
    this.getForecast(this.cityWeather.id, this.days);
    
  }
   getForecast(cityId,days)
   {
     this.weather.forecast(cityId,days)
     .map(data=>data.json())
     .subscribe(data=>{
     this.forecast=data.list;
     },
     err=>console.log(err),
     ()=>console.log('forecast complete')
     );
      }

      info(weather)
      {
        this.nav.push(WeatherInfoPage,{weather:weather});
      }
    
     
   }

