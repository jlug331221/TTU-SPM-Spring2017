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
	  });
	  jQuery('select').material_select(); 
  }
 
	  
}

