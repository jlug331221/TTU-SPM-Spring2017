import { Component, OnInit, ElementRef, OnChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CompleterService, CompleterData } from 'ng2-completer';
import { FireBaseService } from '../../services/firebase.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// JQuery declaration variable
declare var $:any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit, OnChanges {
    elementRef: ElementRef;
    image:any;
    restaurantName:any;
    dish_name:any;
    restaurants:any;
    cuisine_names:any;
    selectedCuisine:any;
    gotresult:string;
    latitude:any;
    longitude:any;
    apiUrl:string

    constructor(elementRef: ElementRef, private fireBaseService:FireBaseService, private router:Router, public flash:FlashMessagesService){}

    ngOnChanges(){

    }

   ngOnInit() {

		this.fireBaseService.getCuisines().subscribe(response => {
			if(response != null){
				this.cuisine_names= response;
			}
		});

		this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {
   			if(response.results != null) {
   				this.restaurants = response.results;
   				this.gotresult="true";
   				//console.log("this.restaurants: "+ response.results);

                let restaurantNames = [];
                let uniqueRestaurantNames = [];

                for (let i = 0; i < this.restaurants.length; i++) {
                    restaurantNames.push(this.restaurants[i].name);
                }

                for(var i = 0; i < restaurantNames.length; i++) {
                    if(uniqueRestaurantNames.indexOf(restaurantNames[i]) == -1){
                        uniqueRestaurantNames.push(restaurantNames[i]);
                    }
                }

                $.typeahead({
                    input: '.js-typeahead-restaurants',
                    order: "desc",
                    source: {
                        data: uniqueRestaurantNames
                    },
                    callback: {
                        onInit: function (node) {
                            console.log('Typeahead Initiated on ' + node.selector);
                        }
                    }
                });
            }
        });
   	}

    fetchPlaceID(restaurantName: string) {
        for(var i = 0; i < this.restaurants.length; i++) {
            if(this.restaurants[i].name == restaurantName) {
                return this.restaurants[i].place_id;
            }
        }
    }

   	onSubmit() {

         let placeID = this.fetchPlaceID($('.js-typeahead-restaurants').val());

         //console.log("Typeahead restaurant name: " + $('.js-typeahead-restaurants').val());
         //console.log("Typeahead restaurant place id: " + placeID);

   		 this.fireBaseService.putImage(this.image,this.dish_name,this.selectedCuisine,$('.js-typeahead-restaurants').val(),placeID).subscribe(status => {
   			//console.log("Status is" + status);
   	 		if(status != "Error") {
   	 			console.log('added');

   	 			this.router.navigate(['/']);
   	 			this.flash.show('Thank You for your input',{cssClass: 'alert-success', timeout: 5000});
   	 		} else {
   	 			console.log('Not added');
   	 			this.flash.show('Please add valid message', {cssClass: 'alert-success', timeout: 5000});
   	 			this.router.navigate(['/']);
   	 		}
   		});
	}
}
