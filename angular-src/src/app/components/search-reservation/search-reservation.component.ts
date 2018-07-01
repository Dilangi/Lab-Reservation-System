import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';

declare var jsPDF: any;

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
  ) {}

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

  download(){
    const date = this.date;
    console.log(date);
    const columns = ["LAB NAME","SUBJECT", "FROM", "TO", "RESERVED BY"];
    const rows = [];
    const data = this.lab;
    for (let lab of data) {
      const array = [];
      array.push(lab.labname, lab.subject, lab.from, lab.to, lab.username);
      rows.push(array);
      
    }

    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns,rows);
   // console.log(this.lab);
    doc.save(date+'_'+'reservations.pdf');
  }

}
