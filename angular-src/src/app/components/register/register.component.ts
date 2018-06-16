import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  // every time we use a service we need to inject it to the relevant constructor
  //private flashMessage:FlashMessage
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    // testing - console.log(this.name); 
    // create an object to take the user inputs 
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert alert-danger', timeout: 3000});
      //console.log('Please fill in all fields');
      return false;
    }

     // validate email
     if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email!', {cssClass: 'alert alert-danger', timeout: 3000});
      //console.log('Please use a valid email!');
      return false;
    }

    // Register user
   this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
