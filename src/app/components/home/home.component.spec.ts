/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule, FirebaseObjectObservable } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FireBaseService } from '../../services/firebase.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from './home.component';

let updatelikeService;
let fbService;
describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    const firebaseConfig = {
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
              RouterTestingModule, HttpModule,
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
				HttpModule
            ],
            providers: [ FireBaseService ],
            declarations: [ HomeComponent, NavbarComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
       updatelikeService = fixture.debugElement.injector.get(FireBaseService);
       fbService = fixture.debugElement.injector.get(FireBaseService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    //checks the like cuisine feature
    it('should return with a new likes count of +1',() =>{
        let initLikes: number;
        let postLikes: number;
        let diff: number;
        let name: string;
        let cuis: cuisine;
        let user = "9999hhhh9999";
        this.name='Italian';

        updatelikeService.getCuisine(this.name).subscribe(res=>{
            if(res != null)
            this.cuis = res;
        });

        initLikes = this.cuis.likes; 
        //console.log(initLikes);      
        updatelikeService.updateCuisineLikes(this.cuis, initLikes+1);
        postLikes = this.cuis.likes;
        //console.log(postLikes);
        diff = postLikes - initLikes;
        updatelikeService.updateCuisineLikes(this.cuis, postLikes-1);
        //console.log(diff);
        expect(diff).toBe(1);
       });
      

        //tests google api request to get a restaurant id
    /*it('should return a restaurant id from googles place api',() => {
        fbService.getRestaurantId("Olive Garden", "Lewisville", "Texas").subscribe(data =>{
            this.res = data;
            console.log(this.res);
        });
        if(this.res != null) 
        expect(this.res).toBe("ChIJ_UypeeMuTIYRGtrKERCRj2U");
       });
});*/

interface cuisine{
	$key?: string;
	image_url?: string;
	likes: number;
	description: string;
}


