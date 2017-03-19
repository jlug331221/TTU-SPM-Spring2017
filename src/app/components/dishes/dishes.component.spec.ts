/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { FireBaseService } from '../../services/firebase.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { DishesComponent } from './dishes.component';

let dishesService;

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

    /**
     * Call async function because the TestBed.createComponent method is synchronous.
     * The Angular template compiler must read from the external HTML and CSS files
     * before it can create a component instance (dishes.component.ts is reading from
     * an external templates).
     */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
              RouterTestingModule,
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
            ],
            providers: [ FireBaseService ],
            declarations: [ DishesComponent, NavbarComponent ]
        }).compileComponents(); // compile HTML template and CSS files
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DishesComponent);
        component = fixture.componentInstance;
        //fixture.detectChanges();

        dishesService = fixture.debugElement.injector.get(FireBaseService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all dishes pertaining to the `italian` cuisine name', () => {
        let dishes;

        let cuisineName = 'italian';
        dishes = dishesService.getDishesForCuisineName(cuisineName).subscribe(response => {
            console.log(response);
            dishes = response;
        });

        console.log(dishes);

        expect(dishes[0].name).toBe("Name 1");
    });
});
