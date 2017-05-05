/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { HttpModule, Http} from '@angular/http';
import { FireBaseService } from '../../services/firebase.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecommendComponent } from './recommend.component';

describe('RecommendComponent', () => {
    let component: DishesComponent;
    let fixture: ComponentFixture<DishesComponent>;
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
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
			  HttpModule

            ],
            providers: [ FireBaseService ],
            declarations: [ DishesComponent, NavbarComponent ]
        }).compileComponents(); // compile HTML template and CSS files
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DishesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dishesService = fixture.debugElement.injector.get(FireBaseService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all dishes pertaining to the `italian` cuisine name', done => {
        component.cuisineName = 'italian';
        let cuisineName = 'italian';

        dishesService.getDishesForCuisineName(cuisineName).subscribe(response => {
            fixture.whenStable().then(() => {
                component.dishes = response;

                fixture.detectChanges();

                let i = 0;
                response.forEach(function(dish) {
                    //console.log(dish);
                    expect(dish.cuisineName).toBe("italian");

                    //  get the dish card element by CSS selector (e.g., by class name)
                    de = fixture.debugElement.query(By.css('.row'));

                    //console.log(de.children[i].nativeElement.childNodes[1].childNodes[3].childNodes[1].childNodes[0].data);

                    expect (de.children[i].nativeElement.childNodes[1].childNodes[3].childNodes[1].childNodes[0].data).toBe(dish.name);

                    i++;
                });

                done();
            });
        });
    });
});
