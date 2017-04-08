import { Component, OnInit, ElementRef, OnChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CompleterService, CompleterData } from 'ng2-completer';
import { FireBaseService } from '../../services/firebase.service';

declare var jQuery:any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
 export class SettingsComponent implements OnInit,OnChanges {
    elementRef: ElementRef;	
    //list:Array<restaurants> = [];
   //restaurants:Array<string> = [];
   restaurants:any;	
   
   constructor(elementRef: ElementRef, private fireBaseService:FireBaseService) { 
   	this.elementRef = elementRef;
   }
   ngOnChanges(){
 	 
   }	
 
   ngOnInit() {
  	  //this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {
  		   // this.restaurants=response;
   		 	//console.log(response[0].$key);	
      //});
   }
 
   ngAfterViewInit(){
 	  let newData = jQuery.extend({}, jQuery('input.autocomplete').autocomplete());
  
      //this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {
 		//});
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