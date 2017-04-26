import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Response, Headers, RequestOptions, HttpModule, Jsonp, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { User } from '../interfaces/user.interface';


@Injectable()
export class FireBaseService {
	

	constructor(private af: AngularFire, private http: Http) { }
	firebaseCuisines: FirebaseListObservable<any[]>;
	dishesForCuisineName: FirebaseListObservable<any[]>;
	fbComments: FirebaseListObservable<any[]>;
	fbDish: FirebaseObjectObservable<any>;
	fbCuisine: FirebaseObjectObservable<any>;
	fbCuis: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any[]>;
	user: FirebaseObjectObservable<any>;
   fbUser: FirebaseObjectObservable<any>;
	fbRating: FirebaseObjectObservable<any>;
	fbRatingList: FirebaseListObservable<any>;
	fbUserLike:  FirebaseObjectObservable<any>; 

	aPi:any;
	result:any;
	latitude:any;
	commentObject:comments;
	authData:any;
	longitude:any;
	apiUrl:string;

	private res;
	placeDish:dish;
	private rest;
	private cit;
	private st;	
	
	setAuthData(auth){
		this.authData= auth;
	}
	
	getAuthData(){
		return this.authData;
	}

	
	setComments(dish_id,user_name,comment_data){
		this.commentObject ={user:user_name, comment_data:comment_data, rating:5};
		
		
		this.af.database.list('/dishes/'+ dish_id + '/comments/').push(this.commentObject).then(result=> console.log(result));
	}

	//get cuisine by name
	getCuisine(name: string) {
		this.fbCuis = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>;
		//console.log(this.fbCuis);
		return this.fbCuis;
	}

	//gets all cuisine types
	getCuisines() {
		this.firebaseCuisines = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/home/Cuisine') as FirebaseListObservable<cuisines[]>;
		return this.firebaseCuisines;
	}

	/**
	 * Get dishes from firebase DB for a particular cuisine name
	 *
	 * @param  {string} cuisineName [Cuisine name]
	 * @return FirebaseListObservable<dishes[]>
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
	/**
	 * Add new Foogle user to the database.
	 *
	 * @param {User} userObj [User info from the user-profile component form]
	 * @return User as FirebaseObjectObservable<any>
	 */
	addNewUser(userObj: User) {
		return this.af.database.object('users/' + userObj.uid).set({
			uid: userObj.uid,
			first_name: userObj.first_name,
		    last_name: userObj.last_name,
		    location_city: userObj.location_city,
		    location_state: userObj.location_state,
		    profile_photo_url: userObj.profile_photo_url,
		    diet: userObj.diet
		});
	}

	/**
	* Update user profile in database
	*
	* @param {User} userObj [User profile info from the user-profile edit form]
	* @return User as FirebaseObjectObservable<any>
	*/
	editUserProfilePref(userObj: User) {
		return this.af.database.object('users/' + userObj.uid).update({
			location_city: userObj.location_city,
			location_state: userObj.location_state,
			diet: userObj.diet
		});
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
		return this.http.get(googleResturl).map( data => {
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
		//console.log(restId);
		let googleRestDetailsurl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurantDetails/'+restId
			return this.http.get(googleRestDetailsurl).map( response => {
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

	
	//increments the cuisine like field by + or - 1 depending on whether
	//the user has liked the cuisine before.  The user has the ability to take away 
	//a cuisine like.
	updateUserCuisineLike(user, userLike, cuisine){
		let cuisLikes = cuisine.likes
		 this.fbUserLike = this.af.database.object('/userCuisineLikes/' + cuisine.$key + '/' + user) as FirebaseObjectObservable<any>
		if(userLike == true){
					cuisLikes = cuisLikes - 1
					this.fbUserLike.update({ likes: false});
					this.updateCuisineLikes(cuisine, cuisLikes);
				}
		else if (userLike == false){
					cuisLikes = cuisLikes + 1
					this.fbUserLike.update({ likes: true});
					this.updateCuisineLikes(cuisine, cuisLikes);
			}
	}

	//Updates a cuisine's likes by one.  User can only like a cuisine once.
  	updateCuisineLikes(cuisineObj: cuisine, likes){
	  	let lik = likes;
		let name = cuisineObj.$key;
	 	this.fbCuisine = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>
		this.fbCuisine.update({likes: lik});
		//console.log(lik);
	}

	//returns rating information
	getRating(user, dish) {
		let u = user;
		let d = dish;
		this.fbRating = this.af.database.object('userRatings/'+ d + '/' + u) as FirebaseObjectObservable<any>
		return this.fbRating;
	}

	getRatingAverage(dish){
		this.fbRatingList = this.af.database.list('userRatings/' + dish) as FirebaseListObservable<any>;
		return this.fbRatingList;
	}

	//returns comments
	getComments(dish_id) {
		this.fbComments = this.af.database.list('/dishes/'+ dish_id + '/comments') as FirebaseListObservable<comments[]>
		return this.fbComments;
	}

	//Updates a cuisine's likes by one,*** Needs authentication***
  updateCuisinelikes(cuisineObj: cuisine, likes) {
	  	let name = cuisineObj.$key;
	 	  this.fbCuisine = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>
		  //console.log(this.fbCuisine);
	  	let likeInc = likes + 1;
		  this.fbCuisine.update({likes: likeInc});
		  //console.log(cuisineObj);
	}
	

	putImage(image,dish_name,cuisine_name,restaurant_name){
			let path = "'"+restaurant_name+"/"+cuisine_name+"/"+dish_name+"'";
			const storageRef= firebase.storage().ref().child(path);
			for(let selectedFile of [(<HTMLInputElement>document.getElementById('fileUpload')).files[0]]){
				storageRef.put(selectedFile).then((snapshot)=>{
					//this.uploadedFileSnapshot = snapshot.downloadURL as Observable<string> ;
					this.result=snapshot
					console.log(this.result.a.downloadURLs[0]);
					this.placeDish={
						name:dish_name,
						cuisineName:cuisine_name.toLowerCase(),
						description:dish_name+'at'+restaurant_name,
						img_url:this.result.a.downloadURLs[0],
						restaurant_name: restaurant_name,
						avg_rating: 2.5
					}
					this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/dishes').push(this.placeDish);
				});
			}
			
			return Observable.of(this.result);
	}
	
	getLocation(){
		this.latitude=23.0078579;
		this.longitude=72.5138152;
		
		
		//this.apiUrl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurant/'+this.latitude+'/'+this.longitude;
		
		navigator.geolocation.getCurrentPosition(position=>{
			this.latitude= position.coords.latitude;
			this.longitude = position.coords.longitude;
			console.log(position.coords.latitude);
			console.log(position.coords.longitude);
   		 	
			this.apiUrl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurant/'+this.latitude+'/'+this.longitude;
  		  	
			
		 });
	}
  getRestaurantBasedOnLocation(){
		
		if(this.latitude!=null){
		  	  return this.http.get(this.apiUrl).map(
				 data=>{
				 this.res = data.json();
				 console.log(this.res);
				return this.res;
			});
		}
	  	
	}
	
	  	
}


interface cuisines {
	$key?: string;
	image_url?: string;
	
}

interface dish {
	$key?: string;
	//dish_id: number;
	name: string;
	cuisineName: string;
	description: string;
	img_url: string;
	restaurant_name: string;
	avg_rating: number;
	
}

interface comments {
	user: string;
	comment_data: string;
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
	$key?: string;
	avg_rating: number;
}

interface restaurants {
	restaurant_city: string;
	restaurant_name: string;
}

interface cuisine {
	$key?: string;
	image_url?: string;
	likes: number;
	description: string;
}