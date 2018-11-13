import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  setting:Settings={allowRegisteration:true,disableBalanceOnAdd:true,disableBalanceOnEdit:true}
  constructor() {
    if(localStorage.getItem('settings')!=null){
      this.setting=JSON.parse(localStorage.getItem('settings'));
    }
   }

  getSettings(){
    return this.setting;
  }

  changeSetting(settings:Settings){
    localStorage.setItem('settings',JSON.stringify(settings));
  }
}
