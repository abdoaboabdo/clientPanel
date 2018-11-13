import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireObject,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client'
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients:Observable<any[]>;
  client:Observable<any>;
  
  constructor( public db:AngularFireDatabase) {
    this.clients=this.db.list('/clients').snapshotChanges();
  }
  getClients(){
    return this.clients;
  }
  getClient(id:string){
    this.client = this.db.object('/clients/'+id).valueChanges();
    this.client.subscribe(client=>{
      if (client==null){
        this.client=null;
      }
    });

    return this.client;
  }
  newclient(client:Client){
    this.db.list('/clients').push(client);
  }
  updateClient(id:string,client:{
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    balance?:string,
  }){
    this.db.object('/clients/'+id).update(client);
  }

  deleteClient(id:string){
    this.db.object('/clients/'+id).remove();
  }
}
