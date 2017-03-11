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

    constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService) { }

    ngOnInit() {
        // Get cuisine name parameter from URL
        this.sub = this.route.params.subscribe(params => {
            this.cuisineName = params['cuisineName'];
        });

        // Make call to firebase DB for dishes that match the cuisine name
        this.fireBaseService.getDishesForCuisineName(this.cuisineName).subscribe(response => {
            this.dishes = response;
            console.log(response);
        });
    }

}
