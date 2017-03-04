import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {ValidateService} from './services/validate.service'
const appRoutes:  Routes = [
	{path:'', component: HomeComponent},
	{path:'login', component: LoginComponent}


];
export const firebaseConfig = {
  	apiKey: "AIzaSyA0o_LSdE-c3c_8hPIoTY9LggnJXy6lTak",
    authDomain: "spm-spring2017-7fbab.firebaseapp.com",
    databaseURL: "https://spm-spring2017-7fbab.firebaseio.com",
    storageBucket: "spm-spring2017-7fbab.appspot.com",
    messagingSenderId: "544260738212"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
	AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
