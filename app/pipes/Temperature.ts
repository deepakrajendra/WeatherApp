import { Injectable, Pipe } from '@angular/core';
@Pipe({

  name: 'temperature'
})
export class TemperaturePipe {
@Injectable()
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
   var c=Math.round(parseInt(value,10)-273.15);
   var f=Math.round(parseInt(value,10)*9/5-459.67);
 
   return `${c}°C `
  }
}



