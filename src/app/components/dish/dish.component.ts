import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { RatingModule } from 'ngx-rating';
import { FormsModule } from '@angular/forms';


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
  constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService,private af: AngularFire) {}

  ngOnInit() {
    //gets route parameter
     this.dish_id = this.route.snapshot.params['$key'];

    //gets dish object which corresponds to route parameter '$key'
     this.fireBaseService.getDish(this.dish_id).subscribe(dish => {
            this.dish = dish;
            this.starCount_avg = dish.avg_rating;
            //console.log(this.dish);
      });

    this.fireBaseService.getComments(this.dish_id).subscribe(comments => {
            this.comments = comments;
            //console.log(this.comments);
      });
    }
	onAddedComment(){
		console.log("Adding Dish");
		this.authData=this.fireBaseService.getAuthData();
		this.fireBaseService.setComments(this.dish_id,this.authData.auth.displayName,this.addedComment);
		this.addedComment="";
	}
  }
