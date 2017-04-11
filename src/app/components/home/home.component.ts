import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service'
import { HttpModule, Http} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	cuisines:any;
  private cuisineName: string;
  private likes: any;
   private cuisine: any;

    constructor(private af: AngularFire, private fireBaseService:FireBaseService ) { }

    ngOnInit() {
      this.fireBaseService.getCuisines().subscribe(cuisine => {
    	  this.cuisines = cuisine;
      });  
  
    }
    likeCuisine(cuisine){
      this.likes = cuisine.likes;
      this.cuisine = cuisine;
      this.fireBaseService.updateCuisinelikes(this.cuisine, this.likes);
      //console.log(cuisine.likes);
    };
  }
      
  
