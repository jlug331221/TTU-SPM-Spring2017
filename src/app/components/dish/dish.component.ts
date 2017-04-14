import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { RatingModule } from 'ngx-rating';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'], 
})
export class DishComponent implements OnInit {
  private dish_id: any;
  private dish: any;
  private comments: any[]; 
  private starCount_avg: number;
  private starSelect;
  private details: any;
  private userID; 
  private userExists = false;

  constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService, private af: AngularFire) {}

  ngOnInit() {
    this.af.auth.subscribe(authData => {
            if(authData != null) {
                this.userExists = true;
                this.userID = authData.uid;
            }

        });
    //gets route parameter
     this.route.params.subscribe(params => {
            this.dish_id = params['$key'];
            this.dish_id = this.dish_id;
        });
  
    //gets dish object which corresponds to route parameter '$key'
     this.fireBaseService.getDish(this.dish_id).subscribe(dish => {
            if(dish!= null){
            this.dish = dish;
            this.starCount_avg = dish.avg_rating;
            console.log(this.dish);
          }
           if(this.dish.place_id != null){
            this.fireBaseService.getRestaurantDetails(this.dish.place_id).subscribe(details =>{
               this.details = details
              console.log(this.details);        
            });
           }
      });

    this.fireBaseService.getComments(this.dish_id).subscribe(comments => {
            this.comments = comments;
            console.log(this.comments);
      });
   
    } 
    rateDish(){
      if (this.userExists != false){
          this.fireBaseService.checkUserRatingExists(this.userID, this.starSelect, this.dish_id)
      }
    }
    
    }

  

  



