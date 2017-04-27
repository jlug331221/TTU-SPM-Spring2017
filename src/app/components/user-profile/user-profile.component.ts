import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireBaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { User } from '../../interfaces/user.interface';

// JQuery declaration variable
declare var $:any;

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
    private newUser: User;
    private editUser: User;
    private user: User;

    //user info variables to display in profile within HTML
    private user_first_name;
    private user_last_name;
    private user_location_city;
    private user_location_state;
    private user_diet;
    private user_profile_photo_url;
    private user_profile_comments;

    // Form fields
    private first_name: any;
    private last_name: any;
    private location_city: any;
    private location_edit_city: any;
    private location_state: any;
    private diet: any;

    // Form validation variables
    private mustEnterState: any;
    private mustEnterDiet: any;
    private mustEnterEditState: any;
    private mustEnterEditDiet: any;

    private loading: any;

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
        },
        {
            "name": "Atkins",
            "value": "atkins"
        }
    ]

    constructor(
        private af: AngularFire,
        private fireBaseService: FireBaseService,
        private router: Router, private DOMelRef: ElementRef) { }

    /**
     * Edit Foogle user to the database.
     *
     * @param {string} stateSelectEditOption [State select option from edit form]
     * @param {string} dietSelectEditOption [Diet select option from edit form]
     * @return void
     */
    editUserPref(stateSelectEditOption: string, dietSelectEditOption: string) {
        this.mustEnterEditState = false;
        this.mustEnterEditDiet = false;

        // Naive validation
        if(stateSelectEditOption == "Choose your state") { this.mustEnterEditState = true; }
        if(dietSelectEditOption == "Choose your diet") { this.mustEnterEditDiet = true; }

        // Form is only submitted if validation passes -> user is added to DB
        if(stateSelectEditOption != "Choose your state" && dietSelectEditOption != "Choose your diet") {
            this.editUser = {
                uid: this.authDataUID,
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                location_city: this.location_edit_city,
                location_state: stateSelectEditOption,
                profile_photo_url: this.authDataPhotoUrl,
                diet: dietSelectEditOption
            };

            console.log(this.editUser);

            //edit user in DB and update user-profile data within HTML
            this.fireBaseService.editUserProfilePref(this.editUser).then(function() {
                console.log("User profile preferences updated");

                $('#user-profile-edit-icon').css("display", "block");
                $('#user-profile-cancel-icon').hide();
                $('.user-profile-info-no-edit').css("display", "block");
                $('.user-profile-comments').css("display", "block");
                $('.user-profile-favorite-dishes').css("display", "block");

                $('.user-profile-info-edit').hide();
                $('.user-profile-info-edit')[0].reset();
            });
        }
    }

    /**
     * Add new Foogle user to the database.
     *
     * @param {string} stateSelectOption [State select option from form]
     * @param {string} dietSelectOption [Diet select option from form]
     * @return void
     */
    addUserToDatabase(stateSelectOption: string, dietSelectOption: string) {
        //console.log(this.DOMelRef.nativeElement.querySelector('#modal-button').style);
        //console.log(this.DOMelRef.nativeElement.querySelector('#set-user-profile-preferences-modal'));
        this.mustEnterState = false;
        this.mustEnterDiet = false;

        // Naive validation
        if(stateSelectOption == "Choose your state") { this.mustEnterState = true; }
        if(dietSelectOption == "Choose your diet") { this.mustEnterDiet = true; }

        // Form is only submitted if validation passes -> user is added to DB
        if(stateSelectOption != "Choose your state" && dietSelectOption != "Choose your diet") {
            this.newUser = {
                uid: this.authDataUID,
                first_name: this.first_name,
                last_name: this.last_name,
                location_city: this.location_city,
                location_state: stateSelectOption,
                profile_photo_url: this.authDataPhotoUrl,
                diet: dietSelectOption
            };

            console.log(this.newUser);

            //add user to DB
            this.fireBaseService.addNewUser(this.newUser).then(function() {
                //navigate back to user profile page
                console.log("Added user to db");
            });
        }
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
            this.loading = true;

            if(! snapshot.val()) {
                this.loading = false;

                // user does not exist, have user set up intial profile
                this.userExists = false;
            } else {
                this.userExists = true;

                this.user = snapshot.val();

                console.log(this.user);

                this.user_first_name = this.user.first_name;
                this.user_last_name = this.user.last_name;
                this.user_location_city = this.user.location_city;
                this.user_location_state = this.user.location_state;
                this.user_diet = this.user.diet;
                this.user_profile_photo_url = this.user.profile_photo_url;

                this.loading = false;
            }
        });
    }

    /*openModal() {
        alert('You want to open the modal');
        console.log($('#set-user-profile-preferences-modal').modal({}))
        $('#set-user-profile-preferences-modal').modal({
            dismissible: true,
            opacity: .8,
            inDuration: 300,
            outDuration: 200,
        });
    }*/

    editProfile() {
        $('#user-profile-edit-icon').hide();
        $('#user-profile-cancel-icon').css("display", "block");
        $('.user-profile-info-no-edit').hide();
        $('.user-profile-comments').hide();
        $('.user-profile-favorite-dishes').hide();

        $('select').material_select();
        $('.user-profile-info-edit').css("display", "block");
    }

    cancelEditProfile() {
        $('#user-profile-edit-icon').css("display", "block");
        $('#user-profile-cancel-icon').hide();
        $('.user-profile-info-no-edit').css("display", "block");
        $('.user-profile-comments').css("display", "block");
        $('.user-profile-favorite-dishes').css("display", "block");

        $('.user-profile-info-edit').hide();
        $('.user-profile-info-edit')[0].reset();
    }

    ngOnInit() {
        //console.log($('#user-profile-edit').html());

        this.af.auth.subscribe(authData => {

            if(authData != null) {

                this.authDataUID = authData.uid;
                this.authDataPhotoUrl = authData.google.photoURL;

                this.checkIfFirstLogin(authData);

                this.user_profile_comments = this.fireBaseService.getCommentsForUserProfile(authData.uid);

                console.log(this.user_profile_comments);

            }

        });

    }

}
