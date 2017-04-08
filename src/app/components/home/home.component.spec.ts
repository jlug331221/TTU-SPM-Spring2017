/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule, FirebaseObjectObservable } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FireBaseService } from '../../services/firebase.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from './home.component';

let updatelikeService;
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
              RouterTestingModule,
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
        
        this.name='Italian';

        updatelikeService.getCuisine(this.name).subscribe(res=>{
            this.cuis = res;
        });
    
        initLikes = this.cuis.likes; 
    //console.log(initLikes);      
        updatelikeService.updateCuisinelikes(this.cuis, this.cuis.likes);
        postLikes = this.cuis.likes;
     //console.log(postLikes);
        diff = postLikes - initLikes;
     //console.log(diff);
        expect(diff).toEqual(1);
       });

});

interface cuisine{
	$key?: string;
	image_url?: string;
	likes: number;
	description: string;
}
