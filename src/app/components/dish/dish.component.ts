import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { RatingModule } from 'ngx-rating';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
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

  private authData:any;
  private addedComment:string;	
  private res: any;
  private details: any;
  private open: any[];
  private close: any[];
  private starSelect;
  private userID; 
  private userExists = false;
  
  constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService,private af: AngularFire) {}
  ngOnInit() {
     //gets route parameter
    this.dish_id = this.route.snapshot.params['$key'];
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
            //console.log(this.dish);
          }

     });
     this.fireBaseService.getRestaurantDetails(this.dish.place_id).subscribe(details =>{
        this.details = details
       console.log(this.details);        
     });

    this.fireBaseService.getComments(this.dish_id).subscribe(comments => {
            this.comments = comments;
            //console.log(this.comments);
      });
   
    }
    //allows user to rate a dish if they are logged in 
    rateDish(){
      if (this.userExists != false){
          this.fireBaseService.updateDishRating(this.userID, this.starSelect, this.dish_id)
      }
    }
    
    

	//Call this function when user adds the comment
	onAddedComment(){
		console.log("Adding Dish");
		this.authData=this.fireBaseService.getAuthData();
		this.fireBaseService.setComments(this.dish_id,this.authData.auth.displayName,this.addedComment);
		this.addedComment="";
		
	  }
  }

