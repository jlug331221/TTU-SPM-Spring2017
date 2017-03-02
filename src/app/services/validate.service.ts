import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
	user: any;
	constructor() { 
		
	}

	validateRegister(user){
		firebase.auth().createUserWithEmailAndPassword(user.email,user.password ).catch(function(error) {
		 
		});
	}

}
