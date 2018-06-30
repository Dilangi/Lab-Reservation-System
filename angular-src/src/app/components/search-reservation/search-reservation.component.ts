import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-reservation',
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.css']
})
export class SearchReservationComponent implements OnInit {
  labname: String;
  subject:String;
  date: String;
  from: String;
  to: String;
  lab = [];

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchByDate(){
    const date =  this.date;
   // console.log(date);
    this.authService.searchLab(date).subscribe(data =>{
      this.lab = data.labs;
      //console.log(this.lab);
    },
    error =>{
      console.log(error);
      return false;
    }
  );

  }

}
