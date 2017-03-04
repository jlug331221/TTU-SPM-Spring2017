import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ValidateService} from '../../services/validate.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: string;
	email: string;
	password: string;
	constructor(private router:Router) { }
		
	ngOnInit() {
		firebase.auth().createUserWithEmailAndPassword("user.email@email.com","user.password ").catch(function(error) {
			console.log("Error",error);
		});
	}
	onRegister(){
		const user = {
			email: this.email,
			password: this.password
		}
		
		//this.validateService.validateRegister(user);*/
		
		this.router.navigate(['/']);
	}
}
