import {Component} from "@angular/core";
import {NavController,Modal} from 'ionic-angular';
import {AddPage} from '../add/add';

import{TemperaturePipe} from '../../pipes/temperature';
import{ForecastPage} from '../forecast/forecast';
import{Weather} from '../../providers/weather/weather';
import {StorageService} from '../../providers/storage/storage';

@Component({
  templateUrl: 'build/pages/home/home.html',
 providers:[Weather],
  pipes:[TemperaturePipe]
})

export class HomePage {
  
  constructor(private nav: NavController, private weather:Weather,public storage:StorageService) {
  
this.getLocalWeather();
this.getStoredWeather();
}
  public localWeather:Object;
  public weatherList=[];
  
  
  getStoredWeather()
  {
    this.storage.getWeathers().then(
      data=>{
         this.weatherList=JSON.parse(data)||[];
         
      }
    );
    
  }
  
  
  getWeather(city:string, country:string)
  {
    //get weather from api
     this.weather.city(city,country).map((data)=>data.json())
     .subscribe((data)=>{
       this.weatherList.push(data); 
       this.storage.setWeather(data);
     },
     (err)=>console.log(err)
     );
    
    
  }
  addWeather()
  {
    let addWeatherModal=Modal.create(AddPage);
    this.nav.present(addWeatherModal);
    
    addWeatherModal.onDismiss((data)=>{
      if(data)
      {
        this.getWeather(data.city,data.country); 
    }
      
    });
  }
  
  getLocalWeather()
  {
    this.weather.local().subscribe(
      data=>{
        this.localWeather=data;
      }
    )
  }
  
  viewForecast(cityWeather)
  {
  
    this.nav.push(ForecastPage,{cityWeather:cityWeather});
  }
  
}
