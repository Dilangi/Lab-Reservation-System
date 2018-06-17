import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authSrvice: AuthService, private router: Router){

    }

    canActivate(){
        if(this.authSrvice.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}