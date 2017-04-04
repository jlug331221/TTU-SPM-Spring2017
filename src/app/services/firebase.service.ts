import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class FireBaseService {
	firebaseCuisines: FirebaseListObservable<any[]>;
	dishesForCuisineName: FirebaseListObservable<any[]>;
	fbComments: FirebaseListObservable<any[]>;
	fbDish: FirebaseObjectObservable<any>;
	fbCuisine: FirebaseObjectObservable<any>;
	fbCuis: FirebaseObjectObservable<any>;
	

	constructor(private af: AngularFire) { }
	
	//get cuisine by name
	getCuisine(name: string) {
		this.fbCuis = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>;
		console.log(this.fbCuis);
		return this.fbCuis;
	}
	//gets all cuisine types
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
				equalTo: cuisineName
			}
		}) as FirebaseListObservable<dishes[]>;

		return this.dishesForCuisineName;
	}

	getRestaurantBasedOnLocation(){
		this.firebaseCuisines = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/Location/Lubbock',{

		}) as FirebaseListObservable<restaurant []>;

		return this.firebaseCuisines;
	}

	//returns dish information
	getDish($key) {
		this.fbDish = this.af.database.object('/dishes/'+ $key) as FirebaseObjectObservable<dish>
		return this.fbDish;
	}

	//returns comments
	getComments(dish_id) {
		this.fbComments = this.af.database.list('/dishes/'+ dish_id + '/comments') as FirebaseListObservable<comments[]>
			return this.fbComments;
	}
	 //Updates a cuisine's likes by one,*** Needs authentication***
  	updateCuisinelikes(cuisineObj: cuisine, likes){
	  	let name = cuisineObj.$key;
	 	this.fbCuisine = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>
	  	let likeInc = likes + 1;
		this.fbCuisine.update({likes: likeInc});
		//console.log(cuisineObj);
}
}

interface cuisines {
	$key?: string;
	image_url?: string;
}
interface dish {
	$key?: string;
	dish_id: number;
	name: string;
	cuisineName: string;
	description: string;
	img_url: string;
	restaurant_name: string;
	avg_rating: number;
}
interface comments {
	user: string;
	comment: string;
	rating: number;
}
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
	avg_rating: number;
}

interface restaurants {
	restaurant_city: string;
	restaurant_name: string;
}

interface cuisine{
	$key?: string;
	image_url?: string;
	likes: number;
	description: string;
}
