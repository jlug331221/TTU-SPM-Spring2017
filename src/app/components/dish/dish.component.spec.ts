/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NgModule } from '@angular/core';
import { RatingModule } from "ngx-rating";
import { FireBaseService } from '../../services/firebase.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { DishComponent } from './dish.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';

let fbService;
describe('DishComponent', () => {
    let component: DishComponent;
    let fixture: ComponentFixture<DishComponent>;

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
              RouterTestingModule, RatingModule, FormsModule, HttpModule,
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
            ],
            providers: [ FireBaseService ],
            declarations: [ DishComponent, NavbarComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DishComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fbService = fixture.debugElement.injector.get(FireBaseService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

       //tests api request to google to get restaurant details.
       //Returns a specific property (a phone number) from the details object
    /*it('should return a specific detail from googles place detail api',() =>{
        fbService.getRestaurantDetails('ChIJ_UypeeMuTIYRGtrKERCRj2U').subscribe(details =>{
           this.details = details.result.formatted_phone_number;
        });

        if(this.details != null){
        console.log(this.details.result.formatted_phone_number);
        expect(this.details).toBe("(972) 315-6202");
        }

       });*/ 
});
