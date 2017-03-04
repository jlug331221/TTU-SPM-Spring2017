import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private af: AngularFire, private router:Router) { }

  ngOnInit() {
  }
  login(){
	  this.af.auth.login();
	  this.router.navigate(['/']);
  }
  logOut(){
	  this.af.auth.logout();
  }
  

}
