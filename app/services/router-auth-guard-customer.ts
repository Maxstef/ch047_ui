import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class CanActivateCustomer implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
      if(!this.authService.isLoggedIn()){
          this.router.navigate(['/login']);
          return false;
      } else {
        return (this.authService.role == 'customer');
      }
        
  }
}