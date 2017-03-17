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
<<<<<<< HEAD
export class SettingsComponent implements OnInit,OnChanges {
  elementRef: ElementRef;	
  //list:Array<restaurants> = [] ;
  //restaurants:Array<string> = [];
  restaurants:any;	
  constructor(elementRef: ElementRef, private fireBaseService:FireBaseService) { 
  	this.elementRef = elementRef;
  }
	
  ngOnChanges(){
	 
  }	

  ngOnInit() {
	  this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {
		    this.restaurants=response;
 		 	console.log(response[0].$key);	
=======
export class SettingsComponent implements OnInit, AfterViewInit {
  elementRef: ElementRef;
  list:Array<restaurants> = [] ;

  constructor(elementRef: ElementRef, private fireBaseService:FireBaseService) {
  	this.elementRef = elementRef;
  }


  ngOnInit() {
  }

  ngAfterViewInit(){
	  let newData = jQuery.extend({}, jQuery('input.autocomplete').autocomplete());

      this.fireBaseService.getRestaurantBasedOnLocation().subscribe(response => {

		  for(let name of response){
			  newData.data(name.restaurant_name,null);
		  }
	  	  console.log(newData.data());

	  });

	  jQuery('input.autocomplete').autocomplete({
		  data: newData.data(),
		  limit: 5
>>>>>>> c29275f7cc8ffabf2dc39d4799bb96e391fcaa93
	  });
	  jQuery('select').material_select(); 
  }
<<<<<<< HEAD
 
	  
=======
>>>>>>> c29275f7cc8ffabf2dc39d4799bb96e391fcaa93
}

