import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:{
    $key?:any,
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    balance:string,
}[]=[];
  client:{
    $key?:any,
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    balance:string,
};
  totalOwd:number;
  constructor(private clientServer:ClientService) { 
    
  }

  ngOnInit() {
    this.clientServer.getClients().subscribe(clients=>{
      clients.forEach(client=>{
        this.client=client.payload.val();
        this.client.$key=client.key;
        //console.log(this.client);
        this.clients.push(this.client);
        this.gotoTotalOwd();
      })
    });


    
  }

  gotoTotalOwd(){
    let total:number=0;
    for(let i= 0;i<this.clients.length;i++){
      total+=parseInt(this.clients[i].balance);
    }
    this.totalOwd=total;
  }

}
