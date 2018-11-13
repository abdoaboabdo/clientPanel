import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';

  constructor(
    public authService:AuthService,
    public ngFlashMessageService: NgFlashMessageService,
    public router:Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.login(this.email,this.password).then(res=>{
      this.ngFlashMessageService.showFlashMessage({
        messages: ["You are logged in :)"], 
        dismissible: true,
        timeout: 4000,
        type: 'success'
      });
      this.router.navigate(['/']);
    }).catch((error)=>{
      this.ngFlashMessageService.showFlashMessage({
        messages: [error.message], 
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      this.router.navigate(['/login']);
    });
  }

}
