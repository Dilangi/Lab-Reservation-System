import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
//import { Http ,HttpModule} from '@angular/http';
import { map } from "rxjs/operators";
//import 'rxjs/add/operator/map';

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

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
