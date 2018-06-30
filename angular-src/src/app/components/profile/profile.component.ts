import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import {lab} from '../../lab';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  lab = [];
 


  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user = profile.user;
  },
  err => {
    console.log(err);
    return false;
  }
  );

  const username = this.authService.loadUser().username;
  this.authService.getMyReservation(username).subscribe(data =>{
    this.lab = data.labs;
   // console.log(username); testing
    //console.log(data.labs);
  });
  err => {
    console.log(err);
    return false;
  }
}

onDelete(_id){
  console.log(_id);
  this.authService.delete(_id).subscribe(res =>{
    if(res.success){
      this.ngOnInit();
      //this.router.navigate(['/profile']);
      console.log('deleted');
    }
    
    //this.lab = res.labs;
    //console.log(res.labs);
    
  });

} 

  onUpdate(id){
    this.router.navigate(['/editReservation/'+id]);

  }
}

