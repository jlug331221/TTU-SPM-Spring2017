import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Response, Http} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FireBaseService } from './services/firebase.service';
import { RatingModule } from 'ngx-rating';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ValidateService } from './services/validate.service';
import { DishesComponent } from './components/dishes/dishes.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DishComponent } from './components/dish/dish.component';
import { UserProfileComponent} from './components/user-profile/user-profile.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import {FlashMessagesModule } from "angular2-flash-messages";
import {CustomuploadsComponent} from './components/customuploads/customuploads.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const appRoutes:  Routes = [
	{path:'', component: HomeComponent},
	{path:'settings', component: SettingsComponent},
	{path: 'dishes/:cuisineName', component: DishesComponent},
    {path: 'dish/:$key', component: DishComponent},
	{path: 'customuploads', component:CustomuploadsComponent},
	{path: 'user-profile', component: UserProfileComponent}
];

export const firebaseConfig = {
  	apiKey: "AIzaSyA0o_LSdE-c3c_8hPIoTY9LggnJXy6lTak",
    authDomain: "spm-spring2017-7fbab.firebaseapp.com",
    databaseURL: "https://spm-spring2017-7fbab.firebaseio.com",
    storageBucket: "spm-spring2017-7fbab.appspot.com",
    messagingSenderId: "544260738212"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DishesComponent,
    SettingsComponent,
    DishComponent,
	CustomuploadsComponent,
    UserProfileComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  imports: [
	AgmCoreModule.forRoot({
	        apiKey: "AIzaSyA0o_LSdE-c3c_8hPIoTY9LggnJXy6lTak",
	        libraries: ["places"]
	 }),  
    CommonModule,
    BrowserModule,
	AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule,
	FlashMessagesModule,
    HttpModule,
    RatingModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, FireBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
