import { Injectable } from "@angular/core";
import { CanActivate ,Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, from  } from "rxjs";
import {  } from 'rxjs-compat';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Injectable()

export class AuthGuard implements CanActivate{
    auth:boolean;
    constructor(
        public router:Router,
        public afAuth:AngularFireAuth
    ){
        
    }
    
    canActivate(): boolean{
        this.afAuth.authState.subscribe(auth=>{
            if (!auth) {
                this.router.navigate(['/login']);
                this.auth=false;
                //return false;
            }else{
                //return true;
                this.auth=true
            }
        });
        return this.auth;
    }
}