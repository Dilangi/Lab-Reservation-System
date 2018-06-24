import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {
 private lab = [];

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getReservation().subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
  }

}
