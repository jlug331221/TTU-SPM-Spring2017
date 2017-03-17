import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
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
            this.cuisineName = this.cuisineName.toLowerCase();
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
            console.log(response);
        });
    }
}
