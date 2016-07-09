import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {TemperaturePipe} from '../../pipes/temperature';

/*
  Generated class for the WeatherInfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/weather-info/weather-info.html',
  pipes:[TemperaturePipe]
})
export class WeatherInfoPage {
  public night;
  public morning;
  public evening;
  public average;
  public day;
  public image;
  public humidity;
  public speed;
  public clouds;
 
  public main;
  public description;
  constructor(private nav: NavController,private navParams:NavParams) {
   this.average= this.navParams.get('weather').temp.day;
    this.morning=this.navParams.get('weather').temp.morn;
    this.night=this.navParams.get('weather').temp.night;
    this.evening=this.navParams.get('weather').temp.eve;
    this.image=this.navParams.get('weather').weather[0].icon;

this.main=this.navParams.get('weather').weather[0].main;
this.description=this.navParams.get('weather').weather[0].description;
this.humidity=this.navParams.get('weather').humidity;
this.speed=this.navParams.get('weather').speed;
this.clouds=this.navParams.get('weather').clouds;
}
}
