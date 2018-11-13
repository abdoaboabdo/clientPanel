import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { auth } from 'firebase';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth:AngularFireAuth
  ) { }

  register(email:string,password:string){
    return new Promise<any>((resolve,reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(userData=>{
        resolve(userData)
      }).catch( error=>{
        reject(error)
      });
    })
  }
  login(email:string,password:string){
    return new Promise<any>((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData=>{
        resolve(userData)
      }).catch( error=>{
        reject(error)
        
      });
    })
  }

  getAuth(){
    return this.afAuth.authState;
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
