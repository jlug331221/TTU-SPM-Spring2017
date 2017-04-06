import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    private userInfo: any;
    private userExists: any;

    constructor(private af: AngularFire, private fireBaseService: FireBaseService) { }

    /*addUserToDatabase() {

    }*/

    /**
	 * Check if this is the first time the user is logging into Foogle
	 *
	 * @param  {string} uid [Unique user identifier]
	 * @return void
	 */
    checkIfFirstLogin(uid) {
        this.userInfo = this.af.database.object('https://spm-spring2017-7fbab.firebaseio.com/users/' + 'uid', { preserveSnapshot: true });

        this.userInfo.subscribe(snapshot => {
            console.log(snapshot.val());
            if(! snapshot.val()) {
                // user does not exist, have user set up intial profile and add user to database
                this.userExists = false;
            } else {
                this.userExists = true;
            }


        })
    }

    ngOnInit() {
        this.af.auth.subscribe(authData => {

            if(authData != null) {
                this.checkIfFirstLogin(authData.uid);
            }

        });


    }

}
