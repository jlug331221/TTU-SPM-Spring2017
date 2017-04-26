/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NgModule,Injectable } from '@angular/core';
import { RatingModule } from "ngx-rating";
import { HttpModule } from '@angular/http';
import { FireBaseService } from '../../services/firebase.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { DishComponent } from './dish.component';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


let fbService:FireBaseService;

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

              RouterTestingModule, RatingModule, FormsModule,
              AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
			  HttpModule
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

	it('Should Get dish',()=>{
		let dish_id=1
       fbService.getDish(dish_id).subscribe(dish => {
               if(dish!= null){
               
			   expect(dish.avg_rating).toBe(number);
             }
           
         });
	});

//tests average rating function.  Test simply checks that the average is a 
//value less than 5, since the actual average is constantly changing.
 it('should return a dish average rating less than or equal to 5',() =>{
     let dish_id = 3
         fbService.getRatingAverage(dish_id).subscribe( rating =>{ 
          if(rating != null){
          let ratingObj = rating;
          let ratingSum = 0;
          let avg = 0;

          rating.forEach(snapshot => {
            if(snapshot != null)
              ratingSum = ratingSum + snapshot.rating
             // console.log(ratingSum);
        });
          avg = ratingSum / this.ratingObj.length
          expect(avg).toBeLessThanOrEqual(5);
        }
      });
 }); 
       //tests api request to google to get restaurant details.
       //Returns a specific property (a phone number) from the details object
    it('should return a specific detail from googles place detail api',() =>{
        let det;
        fbService.getRestaurantDetails('ChIJ_UypeeMuTIYRGtrKERCRj2U').subscribe(details =>{
           if(details != null){
           det = details.result.formatted_phone_number;
           }
        });
            if(det != null){
                console.log(det.result.formatted_phone_number);
                expect(det).toBe("(972) 315-6202");
        }
       }); 

   //tests rating update feature             
    it('should check if rating is updated',() => {
        let user = 123456789
        let rating = 3
        let dish = 99999999
        let res;
        fbService.updateDishRating(user, rating, dish);
        fbService.getRating(user, dish).subscribe(rate=>{
            if(rate!= null)
            res = rate.rating;
            //console.log(rate);
        });
        if(res != null){
        expect(res.rating).toBe("3");
        }
       });

});

interface rating {
	rating: string;
}