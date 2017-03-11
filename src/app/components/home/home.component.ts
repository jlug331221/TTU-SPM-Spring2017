import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	cuisines:any;

    constructor(private af: AngularFire, private fireBaseService:FireBaseService ) { }

    ngOnInit() {
      this.fireBaseService.getCuisines().subscribe(cuisine => {
    	  this.cuisines = cuisine;
      });
    }

}
