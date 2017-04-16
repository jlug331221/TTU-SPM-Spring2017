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
  private fbUserLike: FirebaseObjectObservable<any>;

    constructor(private af: AngularFire, private fireBaseService:FireBaseService ) { }

    ngOnInit() {

      this.af.auth.subscribe(authData => {
            if(authData != null) {
                this.userExists = true;
                this.userID = authData.uid
                console.log(this.userExists)
            }
        });

      this.fireBaseService.getCuisines().subscribe(cuisine => {
    	  this.cuisines = cuisine;
      });  
  
    }
    //checks if user is logged in and retrieves user like data for a particular cuisine.
    //cuisine like data is then updated. 
    likeCuisine(cuisine){
      let lik
        
      if(this.userExists){
        this.cuisine= cuisine
        this.fbUserLike = this.af.database.object('/userCuisineLikes/'+ this.cuisine.$key + '/' + this.userID) as  FirebaseObjectObservable<any>;
		
		    this.fbUserLike.subscribe(resp =>{
		      if(resp!=null){
		        lik = resp.likes
            //console.log(lik)
            this.fireBaseService.updateUserLike(this.userID, lik, this.cuisine)
		      }
        });
      this.fireBaseService.updateUserCuisineLike(this.fbUserLike, !lik)        
    }
  }
}
      
  
