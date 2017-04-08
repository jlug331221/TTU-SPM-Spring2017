import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    private authDataUID: any;
    private userExists: any;
    private authDataPhotoUrl: any;
    private userInfoFromFirebase: any;
    private user: User;

    // Form fields
    private first_name: any;
    private last_name: any;
    private location_city: any;
    private location_state: any;
    private diet: any;

    states: Object[] = [
        {
            "name": "Alabama",
            "value": "AL"
        },
        {
            "name": "Alaska",
            "value": "AK"
        },
        {
            "name": "American Samoa",
            "value": "AS"
        },
        {
            "name": "Arizona",
            "value": "AZ"
        },
        {
            "name": "Arkansas",
            "value": "AR"
        },
        {
            "name": "California",
            "value": "CA"
        },
        {
            "name": "Colorado",
            "value": "CO"
        },
        {
            "name": "Connecticut",
            "value": "CT"
        },
        {
            "name": "Delaware",
            "value": "DE"
        },
        {
            "name": "District Of Columbia",
            "value": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "value": "FM"
        },
        {
            "name": "Florida",
            "value": "FL"
        },
        {
            "name": "Georgia",
            "value": "GA"
        },
        {
            "name": "Guam",
            "value": "GU"
        },
        {
            "name": "Hawaii",
            "value": "HI"
        },
        {
            "name": "Idaho",
            "value": "ID"
        },
        {
            "name": "Illinois",
            "value": "IL"
        },
        {
            "name": "Indiana",
            "value": "IN"
        },
        {
            "name": "Iowa",
            "value": "IA"
        },
        {
            "name": "Kansas",
            "value": "KS"
        },
        {
            "name": "Kentucky",
            "value": "KY"
        },
        {
            "name": "Louisiana",
            "value": "LA"
        },
        {
            "name": "Maine",
            "value": "ME"
        },
        {
            "name": "Marshall Islands",
            "value": "MH"
        },
        {
            "name": "Maryland",
            "value": "MD"
        },
        {
            "name": "Massachusetts",
            "value": "MA"
        },
        {
            "name": "Michigan",
            "value": "MI"
        },
        {
            "name": "Minnesota",
            "value": "MN"
        },
        {
            "name": "Mississippi",
            "value": "MS"
        },
        {
            "name": "Missouri",
            "value": "MO"
        },
        {
            "name": "Montana",
            "value": "MT"
        },
        {
            "name": "Nebraska",
            "value": "NE"
        },
        {
            "name": "Nevada",
            "value": "NV"
        },
        {
            "name": "New Hampshire",
            "value": "NH"
        },
        {
            "name": "New Jersey",
            "value": "NJ"
        },
        {
            "name": "New Mexico",
            "value": "NM"
        },
        {
            "name": "New York",
            "value": "NY"
        },
        {
            "name": "North Carolina",
            "value": "NC"
        },
        {
            "name": "North Dakota",
            "value": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "value": "MP"
        },
        {
            "name": "Ohio",
            "value": "OH"
        },
        {
            "name": "Oklahoma",
            "value": "OK"
        },
        {
            "name": "Oregon",
            "value": "OR"
        },
        {
            "name": "Palau",
            "value": "PW"
        },
        {
            "name": "Pennsylvania",
            "value": "PA"
        },
        {
            "name": "Puerto Rico",
            "value": "PR"
        },
        {
            "name": "Rhode Island",
            "value": "RI"
        },
        {
            "name": "South Carolina",
            "value": "SC"
        },
        {
            "name": "South Dakota",
            "value": "SD"
        },
        {
            "name": "Tennessee",
            "value": "TN"
        },
        {
            "name": "Texas",
            "value": "TX"
        },
        {
            "name": "Utah",
            "value": "UT"
        },
        {
            "name": "Vermont",
            "value": "VT"
        },
        {
            "name": "Virgin Islands",
            "value": "VI"
        },
        {
            "name": "Virginia",
            "value": "VA"
        },
        {
            "name": "Washington",
            "value": "WA"
        },
        {
            "name": "West Virginia",
            "value": "WV"
        },
        {
            "name": "Wisconsin",
            "value": "WI"
        },
        {
            "name": "Wyoming",
            "value": "WY"
        }
    ]

    diets: Object[] = [
        {
            "name": "Omnivore",
            "value": "omnivore"
        },
        {
            "name": "Vegetarian",
            "value": "vegetarian"
        },
        {
            "name": "Vegan",
            "value": "vegan"
        },
        {
            "name": "Pescatarian",
            "value": "pescatarian"
        }
    ]

    constructor(
        private af: AngularFire,
        private fireBaseService: FireBaseService,
        private router: Router) { }

    /**
     * Add new Foogle user to the database.
     *
     * @param {string} stateSelectOption [State select option from form]
     * @param {string} dietSelectOption [Diet select option from form]
     * @return void
     */
    addUserToDatabase(stateSelectOption: string, dietSelectOption: string) {
        this.user = {
            uid: this.authDataUID,
            first_name: this.first_name,
            last_name: this.last_name,
            location_city: this.location_city,
            location_state: stateSelectOption,
            profile_photo_url: this.authDataPhotoUrl,
            diet: dietSelectOption
        };

        console.log(this.user);

        //add user to DB
        this.fireBaseService.addNewUser(this.user);

        //navigate back to user profile page
        this.router.navigate(['/user-profile']);
    }

    /**
	 * Check if this is the first time the user is logging into Foogle. If first time logging
	 * in, user will setup their intial profile preferences. Otherwise, user will be shown a
     * page of their profile that they can also edit.
     *
	 * @param  {JSON Object} authData [Object from Google API that contains user info]
	 * @return void
	 */
    checkIfFirstLogin(authData) {
        this.userInfoFromFirebase = this.af.database.object('https://spm-spring2017-7fbab.firebaseio.com/users/' + authData.uid, { preserveSnapshot: true });

        this.userInfoFromFirebase.subscribe(snapshot => {
            //console.log(snapshot.val());
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

                this.authDataUID = authData.uid;
                this.authDataPhotoUrl = authData.google.photoURL;

                this.checkIfFirstLogin(authData);

            }

        });


    }

}
