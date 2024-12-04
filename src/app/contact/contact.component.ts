import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MovieService } from '../sharedService/movieSearch.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactName : any;
  contactData: any;
  contactInfo: any;
  p: any;
  name: any = '';
  username: any = '';
  email: any = '';
  password: any = '';
  

  constructor(private _movieService: MovieService, private router: Router) { }

   // .......................................form validation message..................................................

 value = new FormControl('', [Validators.required]);

 getErrorMessage() {
   return this.value.hasError('required') ? 'You must enter a value' :
           '';
 }


  ngOnInit() {
    console.log('calling contacts');
    this.getContacts();
  }

  getContacts() {
    console.log('inside contacts');
    // if(this.contactName !== undefined && this.contactName.trim().length !== 0
    //   && this.contactName.length !== null)
    //{

          this._movieService.getUsers().subscribe(
            // the first argument is a function which runs on success
            data => this.displaycontactdata(data)

          );
    //}


  }
  displaycontactdata(data) {
    this.contactData = data.result;
    console.log(this.contactData);

  }


   // ....................................Reader add Function starts................................................


   createuser() {
    if(
      this.name !== undefined && this.name.trim().length !== 0 && this.name.length !== null
      )
      {
        console.log('validation success');
        console.log(this.name);
    var userDetails =
            {

               'name': this.name,
               'username': this.username,
               'email': this.email,
               'password': this.password,
             }
console.log('userDetails: ', userDetails);
this._movieService.createusers(userDetails).subscribe(
    // the first argument is a function which runs on success
    data => this.adddata(data),

    // the second argument is a function which runs on error
    err => {
            console.error(err),
            this.errormessage(err);
          },
    // the third argument is a function which runs on completion
    () => console.log('done loading device details')
  );
}
}

// .................................adddata() for showing data in HTML...........................................

adddata(data) {
console.log(data);
swal.fire({
              type: 'success',
              title: 'Added!',
              confirmButtonColor: '#ED992F',
              text: ' your user details added successfully  ',
            });
this.router.navigate(['/']);
}
errormessage(err) {
  swal.fire({
                type: 'warning',
                confirmButtonColor: '#ED992F',
                text: 'Server error OR Dupliacte value found ' + err.error.message,
              });
}

}
