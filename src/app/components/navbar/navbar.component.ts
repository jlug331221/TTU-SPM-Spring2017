import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Router} from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	userImage:string;		 
	userName:string;
	userEmail:string;
  constructor(private af: AngularFire, private router:Router) { 
  }

  ngOnInit() {
	  this.af.auth.subscribe(authData =>{
		  
		  if(authData!=null){
		  	console.log(authData);
		  	this.userImage=authData.auth.photoURL;
			this.userName= authData.auth.displayName;
			this.userEmail= authData.auth.email;
	  	  }
	  
	  });
  }
  login(){
	  this.af.auth.login();
	  
	 
	  this.router.navigate(['/']);
  }
  logOut(){
	  this.af.auth.logout();
  }
  

}

