/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { HttpModule } from '@angular/http';
import { RatingModule } from 'ngx-rating';
import { DebugElement } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ValidateService } from './services/validate.service';
import { FireBaseService } from './services/firebase.service';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

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
			FlashMessagesModule,
			HttpModule,
			RatingModule
          ],
		  providers: [ValidateService, FireBaseService ],
          declarations: [
            AppComponent,
            NavbarComponent,
          ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
