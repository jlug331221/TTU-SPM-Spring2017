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
  private userExists = false;
  private userID;

    constructor(private af: AngularFire, private fireBaseService:FireBaseService ) { }

    ngOnInit() {

      this.af.auth.subscribe(authData => {
            if(authData != null) {
                this.userExists = true;
                this.userID = authData.uid;
            }
        });

      this.fireBaseService.getCuisines().subscribe(cuisine => {
    	  this.cuisines = cuisine;
      });  
  
    }
    likeCuisine(cuisine){
      if(this.userExists){
        this.cuisine= cuisine
        this.fireBaseService.updateUserLike(this.userID, this.cuisine)
    }
  }
}
      
  
