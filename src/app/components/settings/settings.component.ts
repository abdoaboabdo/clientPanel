import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Settings } from "../../models/settings";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;
  constructor(
    public settingsService:SettingsService,
    public router:Router,
    public ngFlashMessage:NgFlashMessageService
  ) { }

  ngOnInit() {
    this.settings=this.settingsService.getSettings();
  }
  onSubmit(){
    this.settingsService.changeSetting(this.settings)
    this.ngFlashMessage.showFlashMessage({
      messages: ["Setting Saved"], 
      dismissible: true,
      timeout: 4000,
      type: 'success'
    });
    this.router.navigate(['/settings']);
  }
}
