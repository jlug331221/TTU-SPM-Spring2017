import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Router} from '@angular/router';
import { FireBaseService } from '../../services/firebase.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	userImage:string;		 
	userName:string;
	userEmail:string;
  constructor(private af: AngularFire, private router:Router, private fireBaseService:FireBaseService) { 
  }

  ngOnInit() {
	  this.af.auth.subscribe(authData =>{
		  
		  if(authData!=null){
		  	console.log(authData);
		  	this.userImage=authData.auth.photoURL;
			this.userName= authData.auth.displayName;
			this.userEmail= authData.auth.email;
			this.fireBaseService.setAuthData(authData);
	  	  }
	  
	  });
  }
  login(){
	  this.af.auth.login();
	  
	 
	  //this.router.navigate(['/']);
  }
  logOut(){
	  this.af.auth.logout();
  }
  

}

