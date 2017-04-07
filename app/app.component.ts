import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';


@Component({
  selector: 'root-app',
  templateUrl: "app/app.component.html"
})
export class AppComponent implements OnInit  {
    
    constructor(private auth: AuthService){

    }
    
    
    ngOnInit(){
        
    }
  
}
