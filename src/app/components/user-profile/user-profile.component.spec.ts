/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FireBaseService } from '../../services/firebase.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { UserProfileComponent } from './user-profile.component';

import { User } from '../../interfaces/user.interface';

let userService;

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let de;

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
              RouterTestingModule, FormsModule,
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
              HttpModule
            ],
            providers: [ FireBaseService ],
            declarations: [ UserProfileComponent, NavbarComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        userService = fixture.debugElement.injector.get(FireBaseService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should see the Set Profile Preferences button when upon initial user profile preferences', () => {
        let user;

        // User is not in the database
        user = null;
        component.userExists = false;

        //  get the dish card element by CSS selector (e.g., by class name)
        de = fixture.debugElement.query(By.css('.user-profile-preferences-button')).nativeElement;

        expect(de.innerHTML).toBe("Set Profile Preferences");
    });

    it('should be able to store new user profile preferences in the database and user can see their profile info', () => {
        let newUser;

        // Simulating the form data input and building newUser object
        newUser = {
            uid: '12345qwert',
            first_name: 'Testy',
            last_name: 'Tester',
            location_city: 'Random City',
            location_state: 'TX',
            profile_photo_url: 'http://lorempixel.com/400/200/'
            diet: 'omnivore',
        }

        //Simulating adding newUser added to database
        component.userExists = true;

        component.user_first_name = newUser.first_name;
        component.user_last_name = newUser.last_name;
        component.user_location_city = newUser.location_city;
        component.user_location_state = newUser.location_state;
        component.user_diet = newUser.diet;
        component.user_profile_photo_url =  newUser.profile_photo_url;

        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.user-profile-name')).nativeElement;
        expect(de.innerHTML.replace(/(\r\n|\n|\r)/gm,"").replace(/\s/g, "")).toBe("Testy");

        de = fixture.debugElement.query(By.css('.user-profile-h5-small-city-state')).nativeElement;
        expect(de.innerHTML).toBe("Random City, TX");

        de = fixture.debugElement.query(By.css('.user-profile-h5-small-diet')).nativeElement;
        expect(de.innerHTML).toBe("Diet: omnivore");
    });
});
