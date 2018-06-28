import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";
import {tokenNotExpired} from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
// private http: Http
  constructor(private http:Http) { }

  // this is what we did in the 'Postman'
  
  registerUser(user){ 
    let headers = new Headers();
    headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
     .pipe(map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
     .pipe(map(res => res.json()));
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
   .pipe(map(res => res.json()));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //add reservation
  addReservation(lab){ 
    let headers = new Headers();
    headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/labs/addReservation', lab, {headers: headers})
     .pipe(map(res => res.json()));
  }

  //view reservation
  getReservation(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/labs/veiwReservation', {headers: headers})
     .pipe(map(res => res.json()));
  }

  // view my reservations
  getMyReservation(username){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/labs/myReservations/'+username, {headers: headers})
     .pipe(map(res => res.json()));
  }

  // get reservation for particular id
  getOneReservation(id){
    //console.log(id); // testing
    let headers = new Headers();
    headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/labs/getReservation/'+id, {headers: headers})
     .pipe(map(res => res.json()));
  }

  delete(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/labs/delete/'+id, {headers: headers})
    .pipe(map(res => res.json()));
  }

  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  update(id,reservation){
    console.log(id);
    //console.log(reservation);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/labs/update/'+id, reservation,{headers:headers})
    .pipe(map(res => res.json()));
  }
  
}

