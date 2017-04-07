import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    private userInfo: any;
    private userExists: any;
    private authDataPhotoUrl: any;
    private user: User;

    constructor(private af: AngularFire, private fireBaseService: FireBaseService) { }

    addUserToDatabase(model: User, isFormDataValid: boolean) {
        console.log("Working on adding user to database");
        console.log(model, isFormDataValid);
    }

    /**
	 * Check if this is the first time the user is logging into Foogle
	 *
	 * @param  {JSON Object} authData [Object from Google API that contains user info]
	 * @return void
	 */
    checkIfFirstLogin(authData) {
        this.userInfo = this.af.database.object('https://spm-spring2017-7fbab.firebaseio.com/users/' + authData.uid, { preserveSnapshot: true });

        this.userInfo.subscribe(snapshot => {
            console.log(snapshot.val());
            if(! snapshot.val()) {
                // user does not exist, have user set up intial profile
                this.userExists = false;
            } else {
                this.userExists = true;
            }
        });
    }

    ngOnInit() {
        this.af.auth.subscribe(authData => {

            if(authData != null) {

                //this.authDataPhotoUrl = authData.google.photoURL;

                this.checkIfFirstLogin(authData);

            }

        });


    }

}
