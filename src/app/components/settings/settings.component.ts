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
   
   constructor(elementRef: ElementRef, private fireBaseService:FireBaseService, private router:Router, public flash:FlashMessagesService) { 
   	this.elementRef = elementRef;
   }
   ngOnChanges(){
 	 
   }	
 
   ngOnInit() {
   	  this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {
   		    this.restaurants = response;
    		 	console.log(this.restaurants);
   		});
   	}
   	onclick(){
		
   		 this.fireBaseService.putImage(this.image,this.dish_name,this.restaurantName).subscribe(status=>{
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
 /*
 		  for(let name of response){
 			  newData.data(name.restaurant_name,null);
 		  }
 	  	  console.log(newData.data());
 
 	  };
 
 	  jQuery('input.autocomplete').autocomplete({
 		  data: newData.data(),
 		  limit: 5
 	  });
 	  jQuery('select').material_select(); 
  
 }*/