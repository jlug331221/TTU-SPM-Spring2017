import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let getRestHttp: Http;
let res;
@Injectable()
export class FireBaseService {
	firebaseCuisines: FirebaseListObservable<any[]>;
	dishesForCuisineName: FirebaseListObservable<any[]>;
	fbComments: FirebaseListObservable<any[]>;
	fbDish: FirebaseObjectObservable<any>;
	fbCuisine: FirebaseObjectObservable<any>;
	fbCuis: FirebaseObjectObservable<any>;
	fbUser: FirebaseObjectObservable<any>;
	fbRating: FirebaseObjectObservable<any>;
	fbUserLike: FirebaseObjectObservable<any>; 

	private res;

	constructor(private af: AngularFire, private getRestHttp: Http) {}
	
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


	/* Returns a restaurant identifier from Google's Place Api
	 * Takes as parameter the city, state and name of the restaurant
	 */
	getRestaurantId(restName: string, city: string, state: string){
		let rest = restName;
		let cit = city;
		let st = state;
		let googleResturl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurantId/'+ rest +'/'+ cit +'/'+'/'+ st
		return this.getRestHttp.get(googleResturl).map( data => {
				if (data != null){
					this.res = data.json().results[0].place_id;
					console.log(this.res);
					return this.res;
				}
			})
	}

	/* Returns restaurant details from Google's Place Api
	 * based on a google id parameter
	 */
	getRestaurantDetails(restId){
		console.log(restId);
		let googleRestDetailsurl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurantDetails/'+restId
			return this.getRestHttp.get(googleRestDetailsurl).map( response => {
					if(response != null){
					let body = response.json();
					//console.log(body);				
					return body;
				}
		});			
	}
	
	//updates the dish rating for a user.  does not allow duplicate ratings.
	updateDishRating(user, rating, dish){
		this.fbUser = this.af.database.object('/userRatings/'+ dish + '/' + user) as FirebaseObjectObservable<any>
		//console.log(this.fbUser);
		this.fbUser.update({rating: rating});
	}

	//updates the like field in theuserCuisineLike table to true or false 
	//for a specific cuisine.  Tracks user input so no duplicates occur.
	updateUserLike(user, cuisine){
		this.fbUserLike= this.af.database.object('/userCuisineLikes/'+ cuisine.$key + '/' + user) as FirebaseObjectObservable<any>
		let cuisLikes = cuisine.likes
		let lik;

		this.fbUserLike.subscribe(resp =>{
			if(resp != null)
			 lik = resp.likes;
			 //console.log(lik);
		})

		if(lik){
					this.updateUserCuisineLike(false);
					lik = false;
					cuisLikes = cuisLikes - 1
					this.updateCuisineLikes(cuisine, cuisLikes);
				}	
			else{
					this.updateUserCuisineLike(true);
					lik = true;
					cuisLikes = cuisLikes + 1
					this.updateCuisineLikes(cuisine, cuisLikes);
			}	
	}
	//increments the cuisine like field by + or - 1 depending on whether
	//the user has liked the cuisine before.  The user has the ability to take away 
	//a cuisine like.
	updateUserCuisineLike(userLike){
		this.fbUserLike.update({
			 likes: userLike
			});
		}

	//Updates a cuisine's likes by one.  User can only like a cuisine once.
  	updateCuisineLikes(cuisineObj: cuisine, likes){
	  	let lik = likes;
		  let name = cuisineObj.$key;
	 	this.fbCuisine = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>
		this.fbCuisine.update({likes: lik});
		console.log(lik);
	}
	
	//returns rating information
	getRating(user, dish) {
		let u = user;
		let d = dish;
		this.fbRating = this.af.database.object('userRatings/'+ d + '/' + u) as FirebaseObjectObservable<any>
		return this.fbRating;
	}

	
	//returns comments
	getComments(dish_id) {
		this.fbComments = this.af.database.list('/dishes/'+ dish_id + '/comments') as FirebaseListObservable<comments[]>
			return this.fbComments;
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
