import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Response, Headers, RequestOptions, HttpModule, Jsonp, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


@Injectable()
export class FireBaseService {
	firebaseCuisines: FirebaseListObservable<any[]>;
	dishesForCuisineName: FirebaseListObservable<any[]>;
	fbComments: FirebaseListObservable<any[]>;
	fbDish: FirebaseObjectObservable<any>;
	fbCuisine: FirebaseObjectObservable<any>;
	fbCuis: FirebaseObjectObservable<any>;
	aPi:any;
	result:any;
	latitude:any;
	commentObject:comments;
	authData:any;
	longitude:any;
	apiUrl:string;
	private res;
	placeDish:dish;
	
	constructor(private af: AngularFire, private http:Http) { }
	
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
		console.log(this.fbCuis);
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
