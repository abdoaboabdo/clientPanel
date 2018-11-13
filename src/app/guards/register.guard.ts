import { Injectable } from "@angular/core";
import { CanActivate ,Router } from "@angular/router";
import { SettingsService } from "../services/settings.service";

@Injectable()

export class RegisterGuard implements CanActivate {

    constructor(
        public router:Router,
        public setting:SettingsService
    ){
        
    }

    canActivate(): boolean{
        if (this.setting.getSettings().allowRegisteration) {
            return true
        } else {
            this.router.navigate(['/login']);
            return false
        }
        
    }
    
    
}