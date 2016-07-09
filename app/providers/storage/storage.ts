import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage,SqlStorage} from'ionic-angular';


@Injectable()
export class StorageService {
 private storageDb='weatherstorage';
 private storage:Storage;
 private weathers:Array<Object>

  constructor() {
  this.storage=new Storage(SqlStorage,{name:this.storageDb});
  this.getWeathers().then(data=>
  this.weathers=JSON.parse(data));
  
  }
getWeathers()
{
  return this.storage.get(this.storageDb);
  
}

removeWeather(weather)
{
  var index=this.weathers.indexOf(weather);
  console.log("index at storage"+index);
  this.weathers.splice(index+1,1);
   this.storage.set(this.storageDb,JSON.stringify(this.weathers));
}
  
  setWeather(weather)
  {
    if(!this.weathers)
    {
      this.weathers=[weather];
      
    }
    else
    {
      this.weathers.push(weather);
    }
    this.storage.set(this.storageDb,JSON.stringify(this.weathers));
  }
}

