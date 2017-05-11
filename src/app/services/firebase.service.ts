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
	fbUserRank:  FirebaseObjectObservable<any>;

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


	setComments(dish_id,user_name,comment_data, user_id, rank){
		 this.af.database.list('/userComments/'+dish_id+'/'+user_id).push({commented: true});
		
		let actRating = this.getRating(user_id, dish_id)
		let rating=0
		let r = rank

		//console.log(actRating)

		actRating.subscribe(res=>{
			if (res.rating!=null)
			rating = res.rating
		})

		if(r == null){
			r = "Foogler"
		}

		this.commentObject ={user:user_name, comment_data:comment_data, like: 0, rating: rating, uid:user_id, ranking: rank};

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
	* @param  {User} userObj [User profile info from the user-profile edit form]
	* @return {User} as FirebaseObjectObservable<any>
	*/
	editUserProfilePref(userObj: User) {
		return this.af.database.object('users/' + userObj.uid).update({
			location_city: userObj.location_city,
			location_state: userObj.location_state,
			diet: userObj.diet
		});
	}

	/**
	 * Get all comments made by a user (used to display on the user profile page).
	 *
	 * @param  {uid} string [uid of logged in user.]
	 * @return {Comments[]} [Comments that User uid has made on any dish.]
	 */
	getCommentsForUserProfile(uid: string) {
		let comments;
		let userComments = [];
		let userComment: any;

		let dishes = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/dishes', { preserveSnapshot: true });

		dishes.subscribe(snapshots => {
			snapshots.forEach(snapshot => {
				if(snapshot.val().comments != null) {
					comments = snapshot.val().comments;

					// If comments is not an array, convert JSON object to an array
					if(! Array.isArray(comments)) {
						comments = Object.keys(comments).map((key) => {
							return comments[key];
						})
					}

					comments.forEach((comment) => {
						if(comment.uid != null && comment.uid == uid) {
							//console.log(snapshot.val().name);
							userComment = {
								user: comment.user,
								comment_data: comment.comment_data,
								rating: comment.rating,
								uid: comment.uid,
								dish_name: snapshot.val().name,
								dish_img: snapshot.val().img_url,
								dish_description: snapshot.val().description
							}
							userComments.push(userComment);
						}
					})
				}
			})
		});

		return userComments;
	}

	/**
	* Get all cuisine likes that have been made by User with user ID uid (used to display on the user profile page).
	*
	* @param  {uid} string [User uid]
	* @return {string[]} [Cuisines that the user has liked.]
	*/
	getUserCuisineLikesForUserProfile(uid: string) {
		let cuisinesLiked = [];

		let userCuisineLikes = this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/userCuisineLikes', { preserveSnapshot: true });

		userCuisineLikes.subscribe(snapshots => {
			snapshots.forEach(snapshot => {
				snapshot.forEach(uidSnap => {
					if(uidSnap.key == uid) {
						cuisinesLiked.push(snapshot.key);
					}
				});
			});
			//console.log(cuisinesLiked);
		});

		return cuisinesLiked;
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
		let googleResturl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurantId/'+ rest +'/'+ cit +'/'+ st
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
		let incr = .5;
		let rating1

		if(rating == null){
			rating1 = 0
		}
		else{
			rating1 = rating
		}
		//console.log(rating1)

		this.fbUser = this.af.database.object('/userRatings/'+ dish + '/' + user) as FirebaseObjectObservable<any>
		//console.log(this.fbUser);
		this.fbUser.update({rating: rating1});
		//updates user ranking after adding a new dish
		this.updateUserRanking(user, incr)

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

	//Updates a cuisine's likes by one
    updateCuisinelikes(cuisineObj: cuisine, likes) {
	  	let name = cuisineObj.$key;
	 	  this.fbCuisine = this.af.database.object('/home/Cuisine/'+ name) as FirebaseObjectObservable<cuisine>
		  //console.log(this.fbCuisine);
	  	  let likeInc = likes + 1;
		  this.fbCuisine.update({likes: likeInc});
		  //console.log(cuisineObj);
	}

	getUserRank(userid){
			this.fbUserRank = this.af.database.object('/userRankings/'+ userid) as FirebaseObjectObservable<any>
			//console.log(this.fbUserRank)
			return this.fbUserRank;
	}

	updateUserRanking(userid, inc){
		let total1;
			//gets a user ranking object from the userRankings table
			this.fbUserLike = this.af.database.object('/userRankings/'+ userid) as FirebaseObjectObservable<any>
			this.fbUserLike.subscribe(res=>{
				if(res!=null){
					if(res.total!=null)
						total1 = res.total+inc
					else
						total1 = inc;
				}
			});
			if(total1!=null){
			if(total1 <= 20)
						this.fbUserLike.update({total: total1, ranking: "Foogler"})
					else if(total1 <= 50)
						this.fbUserLike.update({total: total1, ranking: "* Top Foogler *"})
					else
						this.fbUserLike.update({total: total1, ranking: "** Distinguished Foogler **"})
			}

	}

	putImage(image,dish_name,cuisine_name,restaurant_name,placeId,userID){
			let path = "'"+restaurant_name+"/"+cuisine_name+"/"+dish_name+"'";
			const storageRef= firebase.storage().ref().child(path);
			let incr = 1;
		  for(let selectedFile of [(<HTMLInputElement>document.getElementById('fileUpload')).files[0]]){
					storageRef.put(selectedFile).then((snapshot)=>{
						//this.uploadedFileSnapshot = snapshot.downloadURL as Observable<string> ;
						this.result=snapshot
						console.log(this.result.a.downloadURLs[0]);
						this.placeDish={
							name:dish_name,
							cuisineName:cuisine_name.toLowerCase(),
							description:dish_name,
							img_url:this.result.a.downloadURLs[0],
							restaurant_name: restaurant_name,
							avg_rating: 2.5,
							place_id : placeId,
							userId: userID

						}

						this.af.database.list('https://spm-spring2017-7fbab.firebaseio.com/dishes').push(this.placeDish);
					});
				}
				//updates user ranking after adding a new dish
				this.updateUserRanking(userID, incr)
			return Observable.of(this.result);
	}

	getLocation() {
		this.latitude=23.0078579;
		this.longitude=72.5138152;


		//this.apiUrl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurant/'+this.latitude+'/'+this.longitude;

		navigator.geolocation.getCurrentPosition(position => {
			this.latitude= position.coords.latitude;
			this.longitude = position.coords.longitude;
			//console.log(position.coords.latitude);
			//console.log(position.coords.longitude);

			this.apiUrl = 'https://powerful-thicket-30479.herokuapp.com/getRestaurant/'+this.latitude+'/'+this.longitude;
		});
	}

	getRestaurantBasedOnLocation() {
		if(this.latitude != null) {
      return this.http.get(this.apiUrl).map(data => {
        this.res = data.json();
        console.log(this.res);
        return this.res;
      });
		}
	}


	updateCommentLike(comment,dish_id,likes,userId){
		this.fbUserLike= this.af.database.object('/userCommentLikes/'+userId+"/"+comment.$key) as FirebaseObjectObservable<commentLike>
		this.fbUserLike.update({like: likes})
		this.fbUserLike= this.af.database.object('dishes/'+dish_id+"/comments/"+comment.$key) as FirebaseObjectObservable<comments>
		this.fbUserLike.update({like: likes});
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
	place_id:string;

	userId:string;
}
interface commentLike{
	like:number;

	userId: any;

}
interface comments {
	$key?:string;
	user: string;
	ranking: string;
	comment_data: string;
	rating:number;
	uid: string;
	like:number;
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
