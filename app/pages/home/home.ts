import {Component,} from "@angular/core";
import {NavController,Modal,Alert} from 'ionic-angular';
import {AddPage} from '../add/add';
import{Network,Connection} from 'ionic-native';
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
  
  isActive=true;
  constructor(private nav: NavController, private weather:Weather,public storage:StorageService) {
  // watch network for a disconnect
let disconnectSubscription = Network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-( ')
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = Network.onConnect().subscribe(() => {
  console.log('network connected!'); 
  // We just got a connection but we need to wait briefly
// before we determine the connection type.  Might need to wait 
  // prior to doing any api requests as well.
  setTimeout(() => {
    console.log(Network.connection);
    if (Network.connection === Connection.WIFI) {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();
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
        if(data.city)
        {
        console.log(data.city);
        this.getWeather(data.city,data.country);
      }
      else{
    let alert = Alert.create({
      title: 'Invalid Input',
      subTitle: 'Please add a valid city',
      buttons: ['OK']
    });
    this.nav.present(alert);
  


      }
    }
      
    });
  }
  
  removeWeather(weather)
  {
var index=this.weatherList.indexOf(weather);
console.log("index at ui"+index);
this.weatherList.splice(index,1);
this.storage.removeWeather(weather);
  }


  getLocalWeather()
  {
    this.weather.local().subscribe(
      data=>{
        this.localWeather=data;
     
    },
    err=>{console.error("enable location");}
    )
  }
  
  viewForecast(cityWeather)
  {
  
    this.nav.push(ForecastPage,{cityWeather:cityWeather});
  }
  
}
