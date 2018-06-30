import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {
  today = Date.now();
  id:String;
  username: String;
  labname: String;
  subject:String;
  date: String;
  from: String;
  to: String;
  lab:any;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
      console.log(this.id);
    });
    this.authService.getOneReservation(this.id).subscribe(oneReservation =>{
      this.lab = oneReservation.labs;
     // console.log(this.lab); // testing
      this.labname = this.lab.labname;
      this.subject = this.lab.subject;
      this.date = this.lab.date;
      this.from = this.lab.from;
      this.to = this.lab.to;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onEditLabReservation(id){
    const user = this.authService.loadUser();
    const editedReservation = {
      username:user.username,
      labname:this.labname,
      subject:this.subject,
      date:this.date,
      from:this.from,
      to:this.to
    }
   // console.log(editedReservation);
    this.authService.update(this.id, editedReservation).subscribe(data =>{
      if(data.success){
        this.flashMessage.show('Your reservation is updated', {cssClass: 'alert alert-success', timeout: 3000});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show('This time period was reserved earlier', {cssClass: 'alert alert-danger', timeout: 3000});
        this.router.navigate(['/editReservation/'+this.id]);
      }
    
    });
    
  }

}
