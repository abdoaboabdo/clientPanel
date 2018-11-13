import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { SettingsService } from 'src/app/services/settings.service';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean;
  logInUser:string;
  showRegister:boolean;
  constructor(
    private authService:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
    private settings:SettingsService
  ) { }

  ngOnInit() {
    
    this.authService.getAuth().subscribe(auth=>{
      this.isLogin=auth? true:false;
      if(auth){this.logInUser=auth.email}
      this.showRegister=this.settings.getSettings().allowRegisteration
    })
  }

  logout(){
    this.authService.logout();
    this.ngFlashMessageService.showFlashMessage({
      messages: ["You are logged out :("], 
      dismissible: true,
      timeout: 4000,
      type: 'success'
    });
    this.router.navigate(['/login']);
  }

}
