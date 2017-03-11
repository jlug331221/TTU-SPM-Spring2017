import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FireBaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {ValidateService} from './services/validate.service';
import { DishesComponent } from './components/dishes/dishes.component'
const appRoutes:  Routes = [
	{path: '', component: HomeComponent},
	{path: 'dishes', component: DishesComponent}
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
    DishesComponent

  ],
  imports: [
    BrowserModule,
	AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    HttpModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, FireBaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
