import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ClientService } from "../../services/client.service";
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client={firstName:'',lastName:'',email:'',phone:'',balance:0};
  disabledBalanceOnAdd:boolean=true
  constructor(
    public ngFlashMessageService: NgFlashMessageService,
    public router:Router,
    public clientService:ClientService,
    public settings:SettingsService
  ) { }

  ngOnInit() {
    this.disabledBalanceOnAdd=this.settings.getSettings().disableBalanceOnAdd
  }
  onsubmit({value,valid}:{value:Client,valid:boolean}){
    if(this.disabledBalanceOnAdd){
      value.balance=0;
    }
    if(!valid){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Fill All Fileds"], 
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      this.router.navigate(['add-client'])
    }else{
      this.clientService.newclient(value);

      this.ngFlashMessageService.showFlashMessage({
        messages: ["New Client Add"], 
        dismissible: true,
        timeout: 4000,
        type: 'success'
      });
      this.router.navigate(['/'])
    }
  }
}
