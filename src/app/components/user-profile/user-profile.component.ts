import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    user;

    constructor(private af: AngularFire, private fireBaseService: FireBaseService) { }

    getUserInfo(authUid) {
        return this.fireBaseService
            .getUserProfileInfo(authUid)
            .map((user) => {
                this.user = user;
            })
            .catch((error) => {
                throw error;
            })
    }

    ngOnInit() {
        this.af.auth.subscribe(authData =>{

            if(authData != null){
                //console.log(authData.auth.uid);

                this.getUserInfo(authData.auth.uid).subscribe(_ => {
                    console.log('ngOnit after getUserInfo() ' + this.user);
                });
            }

        });


    }

}
