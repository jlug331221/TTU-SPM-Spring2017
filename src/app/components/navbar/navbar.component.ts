import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	userData:any;		 
	
  constructor(private af: AngularFire, private router:Router) { 
  }

  ngOnInit() {
  }
  login(){
	  this.af.auth.login();
	  this.af.auth.subscribe(authData =>{
		  
		  if(authData!=null){
		  	console.log(authData);
		  	this.userData=authData;
	  	  }
	  
	  });
	  this.router.navigate(['/']);
  }
  logOut(){
	  this.af.auth.logout();
  }
  

}

