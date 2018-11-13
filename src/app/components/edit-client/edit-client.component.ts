import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:{
    //$key?:any,
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    balance?:string,
  }={firstName:'',lastName:'',email:'',balance:'0',phone:''};
  disableBalanceOnEdit:boolean=true;
  constructor(
    private clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public ngFlashMessageService: NgFlashMessageService,
    public setting:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit=this.setting.getSettings().disableBalanceOnEdit;
    this.id=this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client=>{
      
      
      this.client=client;
      
    })
  }

  onsubmit({value,valid}:{value:{
    //$key?:any,
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    balance?:string,
  },valid:boolean}){
    if(!valid){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Fill All Fileds"], 
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      this.router.navigate(['edit-client/'+this.id])
    }else{
      this.clientService.updateClient(this.id,this.client);

      this.ngFlashMessageService.showFlashMessage({
        messages: ["the Client updated"], 
        dismissible: true,
        timeout: 4000,
        type: 'success'
      });
      this.router.navigate(['/client/'+this.id])
    }
  }

}
