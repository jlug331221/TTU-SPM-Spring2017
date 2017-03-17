import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'


@Injectable()
export class FireBaseService {
	firebaseCuisines: FirebaseListObservable<any[]>;

	dishesForCuisineName: FirebaseListObservable<any[]>;

	
	
	constructor(private af: AngularFire) { }

	getCuisines() {
		this.firebaseCuisines = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/home/Cuisine') as FirebaseListObservable<cuisines>;

		return this.firebaseCuisines;
	}

	/**
	 * Get dishes from firebase DB for a particular cuisine name
	 *
	 * param: string cuisineName
	 */
	getDishesForCuisineName(cuisineName) {
		this.dishesForCuisineName = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/dishes', {
			query: {
				orderByChild: 'cuisineName',
				equalTo: cuisineName.toLowerCase()
			}
		}) as FirebaseListObservable<dishes[]>;

		return this.dishesForCuisineName;
	}
	
	getRestaurantBasedOnLocation(){
		this.firebaseCuisines = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/Location/Lubbock',{
			
		}) as FirebaseListObservable<restaurant []>;
		
		return this.firebaseCuisines;
	}
}

interface cuisines {
	$key?: string;
	image_url?: string;
}

// Don't know if comments are needed for the dishes interface. I believe that will
// be included in the dish interface
interface dishes {
	$key?: string
	dish_id: number;
	name: string;
	cuisineName: string;
	description: string;
	img_url: string;
	restaurant_name: string;
	restaurant_city: string;
	rating: number;
}
interface restaurant {
	$key?:string;
}


