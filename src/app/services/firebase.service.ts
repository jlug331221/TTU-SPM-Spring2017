import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FireBaseService {
	firebaseCuisines: FirebaseListObservable<any[]>;
	dishesForCuisineName: FirebaseListObservable<any[]>;
	fbComments: FirebaseListObservable<any[]>;
	fbDish: FirebaseObjectObservable<any>;
	fbCuisine: FirebaseObjectObservable<any>;
	fbCuis: FirebaseObjectObservable<any>;

	private rest;
	private cit;
	private st;	
	private res;
	
	constructor(private af: AngularFire, private getRestHttp: Http) { }
	
	//get cuisine by name
	getCuisine(name: string) {
		this.fbCuis = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>;
		//console.log(this.fbCuis);
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
	//returns a list of restaurant objects from google's place api
	getRestaurantsBasedOnLocation(input: string, city: string, state: string){	
		let st = state;
		let cit = city;	
		let inp = input;
		let googleResturl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants'+cit+'+'+st+'+contains '+inp+'&key=AIzaSyAQvpmdy7gi3VVHuG0hnR0dRaU31MjtQas'
		return this.getRestHttp.get(googleResturl).map( data => {
				if (data != null){
					this.res = data.json();
					//console.log(this.res);
					return this.res;
				}
			})
	}

	//returns dish information
	getDish($key) {
		this.fbDish = this.af.database.object('/dishes/'+ $key) as FirebaseObjectObservable<dish>
		return this.fbDish;
	}

	/* Returns a restaurant identifier from Google's Place Api
	 * Takes as parameter the city, state and name of the restaurant
	 */
	getRestaurantId(restName: string, city: string, state: string){
		let rest = restName;
		let cit = city;
		let st = state;
		let googleResturl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurantId/'+rest+'/'+city+'/'+state
		
		return this.getRestHttp.get(googleResturl).map( data => {
				if (data != null){
					this.res = data.json().results[0].place_id;
					//console.log(this.res);
					return this.res;
				}
			})
	}

	/* Returns restaurant details from Google's Place Api
	 * based on a google id parameter
	 */
	getRestaurantDetails(restId){
		let googleRestDetailsurl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurantDetails/'+restId
			 return this.getRestHttp.get(googleRestDetailsurl).map( response => {
				if (response != null){
					let body = response.json();
					//console.log(body);
					return body;
				}
		});		
	}

	postRestaurantId(restid){
		
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
