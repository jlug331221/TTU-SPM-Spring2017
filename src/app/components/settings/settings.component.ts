import { Component, OnInit, ElementRef, OnChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CompleterService, CompleterData } from 'ng2-completer';
import { FireBaseService } from '../../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
 export class SettingsComponent implements OnInit,OnChanges {
    elementRef: ElementRef;	
	image:any;
	restaurantName:any;
	dish_name:any;
    restaurants:any;
	cuisine_names:any;
	selectedCuisine:any;
	gotresult:string;
	constructor(elementRef: ElementRef, private fireBaseService:FireBaseService, private router:Router, public flash:FlashMessagesService){}
   
   ngOnChanges(){
   		
   }	
 
   ngOnInit() {
	
   	 /* this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {
   		    	//this.restaurants = response;
    		 	//console.log(this.restaurants);
   		});*/
		this.fireBaseService.getCuisines().subscribe(response => {
			if(response!=null){
				this.cuisine_names= response;
			}
			
			
		});
   		
		this.fireBaseService.getRestaurantBasedOnLocation().subscribe(
			response=>{
   			if(response.results!=null){
   				this.restaurants = response.results;
   				this.gotresult="true";
   				console.log("this.restaurants"+ response);
   			}
   		});
		
   	}
   	onSubmit(){
		
   		 this.fireBaseService.putImage(this.image,this.dish_name,this.selectedCuisine,this.restaurantName).subscribe(status=>{
   			 console.log("Status is" + status);
   	 		if(status!="Error"){
   	 			console.log('added');
   	 			this.router.navigate(['/']);
   	 			this.flash.show('Thank You for your input',{cssClass: 'alert-success', timeout: 5000});
   	 		}else{
   	 			console.log('Not added');
   	 			this.flash.show('Please add valid message',{cssClass: 'alert-success', timeout: 5000});
   	 			this.router.navigate(['/']);
   	 		}
   		});
	}
 }
 