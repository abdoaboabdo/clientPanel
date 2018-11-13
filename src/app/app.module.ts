import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
//angularFire Impoerts
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth} from '@angular/fire/auth';

//component Imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//import Services
import { ClientService } from './services/client.service';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { SettingsService } from './services/settings.service';
import { RegisterGuard } from './guards/register.guard';

const appRoutes:Routes=[
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[RegisterGuard]},
  {path:'login',component:LoginComponent},
  {path:'add-client',component:AddClientComponent,canActivate:[AuthGuard]},
  {path:'client/:id',component:ClientDetailsComponent,canActivate:[AuthGuard]},
  {path:'edit-client/:id',component:EditClientComponent,canActivate:[AuthGuard]},
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuard]},
  {path:'**',component:PageNotFoundComponent},
];

export const firebaseconfig={
  apiKey: "AIzaSyCz3DCwZTp-LIFKuXAqstrbLN9KjpEJpP4",
  authDomain: "clientpanel-a5210.firebaseapp.com",
  databaseURL: "https://clientpanel-a5210.firebaseio.com",
  storageBucket: "clientpanel-a5210.appspot.com",
  messagingSenderId: "445415392812"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseconfig),
    FormsModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    AngularFireAuthModule,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ClientService,
    AuthService,
    AuthGuard,
    SettingsService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
