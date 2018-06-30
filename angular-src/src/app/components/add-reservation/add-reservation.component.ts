import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  username: String;
  labname: String;
  subject:String;
  date: String;
  from: String;
  to: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addLabSubmit(){
    const user = this.authService.loadUser();
    const lab = {
      username: user.username,
      labname: this.labname,
      subject: this.subject,
      date: this.date,
      from: this.from,
      to: this.to
    }

    // required fields
    if(!this.validateService.validateReservation(lab)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert alert-danger', timeout: 3000});
      //console.log('Please fill in all fields');
      return false;
    }

     // Add Lab Reservation
   this.authService.addReservation(lab).subscribe(data => {
    if(data.success){
      this.flashMessage.show('A new reservation is added', {cssClass: 'alert alert-success', timeout: 3000});
      this.router.navigate(['/veiwReservation']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert alert-danger', timeout: 3000});
      this.router.navigate(['/addReservation']);
    }
  });
  }

}
