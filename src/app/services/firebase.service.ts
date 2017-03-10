import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'


@Injectable()
export class FireBaseService {
firebasecuisine: FirebaseListObservable<any[]>;

	constructor(private af:AngularFire) { }

	getCuisine(){
  	  this.firebasecuisine = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/home/Cuisine') as FirebaseListObservable<cuisine>
		return this.firebasecuisine;
	}	
}
interface cuisine{
	$key?:string;
	image_url?:string;
}
