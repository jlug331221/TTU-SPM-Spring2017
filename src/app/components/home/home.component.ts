import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service'
import { HttpModule, Http} from '@angular/http';
import * as firebase from 'firebase';

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
      this.cuisine= cuisine
      if(this.userExists){          
       firebase.database().ref('/userCuisineLikes/' + cuisine.$key + '/' + this.userID).once('value').then((res)=>{
            if(res.A.aa!=null){
                res = res.val().likes 
                console.log(res)
                this.fireBaseService.updateUserCuisineLike(this.userID, res, this.cuisine)
            }
            else{
              this.fireBaseService.updateUserCuisineLike(this.userID, false, this.cuisine)
            }
        });            
    }
    
}
}
  


      
  
