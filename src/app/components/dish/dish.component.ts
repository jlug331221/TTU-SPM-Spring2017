import { Component, OnInit, Directive, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';
import { RatingModule } from 'ngx-rating';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';

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
  private res: any;
  private details: any;

  constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService) {}

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
           // console.log(this.comments);
      });
    
    this.fireBaseService.getRestaurantDetails(this.dish.place_id).subscribe(details =>{
            if(details != null){
               this.details = details
              //console.log(this.details);
            }         
        }); 

     this.fireBaseService.getRestaurantsBasedOnLocation("Olive","Dallas", "Texas").subscribe(list =>{
          if(list != null){
            let l = list;
            console.log(list);
          }
     });
            
      
    }

  }



