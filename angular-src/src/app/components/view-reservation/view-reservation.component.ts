import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {
lab = [];

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getReservation().subscribe(
      data =>{
        this.lab = data.labs;
        console.log(this.lab);
      },
      error =>{
        console.log(error);
        return false;
      }
    )
  }

}
