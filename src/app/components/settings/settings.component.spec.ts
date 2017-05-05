/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FireBaseService } from '../../services/firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NavbarComponent } from '../navbar/navbar.component';
import { SettingsComponent } from './settings.component';

let settingsService;

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

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
				FormsModule,
				HttpModule,
				FlashMessagesModule
            ],
            providers: [ FireBaseService ],
            declarations: [ SettingsComponent, NavbarComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

		settingsService = fixture.debugElement.injector.get(FireBaseService);
    });
});

describe('SettingsComponent -> typeahead feature:', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let debug: DebugElement;
    let htmlElem: HTMLElement;

    // JQuery declaration variable
    declare var $:any;

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

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
              RouterTestingModule,
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
                FormsModule,
                HttpModule,
                FlashMessagesModule
            ],
            providers: [ FireBaseService ],
            declarations: [ SettingsComponent ]
        });

        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement.query(By.css('.typeahead__container'));
        htmlElem = debug.nativeElement;
    });

    it('should have the typeahead feature in the settings component', () => {
        expect(htmlElem).toBe(htmlElem);
        //console.log(htmlElem);
    });
});
