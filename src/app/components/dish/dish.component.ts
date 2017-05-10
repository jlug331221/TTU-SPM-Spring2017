import { Component, OnInit, Directive, Input, ElementRef, NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { RatingModule } from 'ngx-rating';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MaterializeModule } from "angular2-materialize";
import * as firebase from 'firebase';
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
  private ratingObj: any;
  private ratingAvg: number;
  private ranking: any;
  private rank: any;
  private map: SafeResourceUrl;
  private authData:any;
  private addedComment:string;
  private res: any;
  private details: any;
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

                 //gets users Foogle ranking
                 this.fireBaseService.getUserRank(this.userID).subscribe(response=>{
                    if(response!= null){
                      this.rank =response.ranking

                      //sets a new Foogle ranking if the user does not have one
                      if(this.rank == null){
                          this.rank = "Foogler"
                      }
                      //console.log(response)
                    }
                 });
            }
        });

    //gets dish object which corresponds to route parameter '$key'
     this.fireBaseService.getDish(this.dish_id).subscribe(dish => {
            if(dish!= null){
            this.dish = dish;
            //console.log(this.dish);
          }
	 	 this.fireBaseService.getRestaurantDetails(this.dish.place_id).subscribe(details =>{
	 	         this.details = details
	 	       // console.log(this.details);
	 	      });

     });
   
     //gets dish comments
    this.fireBaseService.getComments(this.dish_id).subscribe(comments => {
            this.comments = comments;
            //console.log(this.comments);
      });
   
      //calculates the dish rating average of dish
      this.fireBaseService.getRatingAverage(this.dish_id).subscribe( rating =>{ 
          if(rating != null){
          this.ratingObj = rating;
          let ratingSum = 0;

          //console.log(this.ratingObj)

          rating.forEach(snapshot => {
            if(snapshot != null)
              ratingSum = ratingSum + snapshot.rating
              //console.log(ratingSum);
        });
          this.ratingAvg = ratingSum / this.ratingObj.length
          //console.log(this.ratingAvg);
        }
      });
      
    }

    //allows user to rate a dish if they are logged in 
    rateDish(){
      let total1
      if (this.userExists != false){
          this.fireBaseService.updateDishRating(this.userID, this.starSelect, this.dish_id)
        }
      }
       

	//Call this function when user adds the comment
	onAddedComment(){
		console.log("Adding Dish");
		this.authData=this.fireBaseService.getAuthData();
    firebase.database().ref('/userComments/'+this.dish_id+'/'+this.userID).once('value').then((res)=>{
		  if(res.A.aa!=null){
			  console.log("You have commented on this dish");
			  this.addedComment="";
		  }else{
	  		this.fireBaseService.setComments(this.dish_id,this.authData.auth.displayName,this.addedComment, this.authData.uid);
	  		this.addedComment="";
		  }
		})
		

		this.fireBaseService.setComments(this.dish_id,this.authData.auth.displayName,this.addedComment, this.authData.uid, this.rank);
		this.addedComment="";


	  }
	  likeComment(comment){
		  console.log(comment.$key);
		  firebase.database().ref('/userCommentLikes/'+this.userID+'/'+comment.$key).once('value').then((res)=>{
			  console.log(res);
			  if(res.A.aa!=null){
			  	
			  }else{
				  comment.like=comment.like+1;
				  this.fireBaseService.updateCommentLike(comment,this.dish_id,comment.like,this.userID);
			  }
		  })
		  
	  }
  }
