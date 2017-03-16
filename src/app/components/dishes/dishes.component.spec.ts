/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FireBaseService } from '../../services/firebase.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { DishesComponent } from './dishes.component';

describe('DishesComponent', () => {
    let component: DishesComponent;
    let fixture: ComponentFixture<DishesComponent>;

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
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
            ],
            providers: [ FireBaseService ],
            declarations: [ DishesComponent, NavbarComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DishesComponent);
        component = fixture.componentInstance;
        //fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
