import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router,ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:{
    //$key?:any,
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    balance?:string,
  };
  hasBalance:boolean=false;
  showBalanceUpdateInput:boolean=false;
  constructor(
    private clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public ngFlashMessageService: NgFlashMessageService
    ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client=>{
      if(client!=null){
        if(parseInt(client.balance) > 0){
          this.hasBalance=true;
        }
      }
      this.client=client;
      
    })
  }

  updateBalane(){
    //console.log(this.id);
    this.clientService.updateClient(this.id,this.client);
    this.ngFlashMessageService.showFlashMessage({
      messages: ["The Client Updated"], 
      dismissible: true,
      timeout: 4000,
      type: 'success'
    });
    this.router.navigate(['/client/'+this.id])
  }
  deleteClient(){
    this.clientService.deleteClient(this.id);
    this.ngFlashMessageService.showFlashMessage({
      messages: ["The Client Deleted"], 
      dismissible: true,
      timeout: 4000,
      type: 'success'
    });
    this.router.navigate(['/']);
  }

}
