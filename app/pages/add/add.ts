import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

/*
  Generated class for the AddPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add/add.html',
})
export class AddPage {
  constructor(private view: ViewController) {}
  public data=
  {
    country:'us'
    
  };
  dismiss(formData)
  {
   this.view.dismiss(formData); 
    
  }
}
