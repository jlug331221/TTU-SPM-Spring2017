import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { HttpModule, Http} from '@angular/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
    private cuisineName: string;
    private sub: any;
    private dishes: any;

    private noDishes = false;
    private oneDish = false;
    private multipleDishes = true;

    constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService) { }

    ngOnInit() {
        // Get cuisine name parameter from URL
        this.sub = this.route.params.subscribe(params => {
            this.cuisineName = params['cuisineName'];
            this.cuisineName = this.cuisineName;
        });

        // Make call to firebase DB for dishes that match the cuisine name
        this.fireBaseService.getDishesForCuisineName(this.cuisineName).subscribe(response => {
            if(response.length == 0) {
                this.noDishes = true;
                this.multipleDishes = false;
            }

            if(response.length == 1) {
                this.oneDish = true;
                this.multipleDishes = false;
            }

            this.dishes = response;
            //console.log(this.dishes);
        });
    }

}
