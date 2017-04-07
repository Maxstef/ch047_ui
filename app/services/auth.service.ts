import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import {config} from "../config";
import {DateService} from '../services/date.service';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    url = config.url + '/users';
    loggedIn: boolean;
    role: string;
    activeUser: string;
    userId: string;
    constructor(private http: Http) { }
    isLoggedIn(): boolean{
        let role = localStorage.getItem('role');
        if(role == 'admin'){
            this.loggedIn = true;
            this.role = 'admin';
            this.activeUser = localStorage.getItem('username');
            this.userId = localStorage.getItem('id');
            return true;
        } else if (role == 'customer'){
            this.loggedIn = true;
            this.role = 'customer';
            this.activeUser = localStorage.getItem('username');
            this.userId = localStorage.getItem('id');
            return true;
        } else {
            return false;
        }
        
    }
    getUsers(){
        return this.http.get(this.url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    logout(){
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        this.loggedIn = false;
        this.role = '';
    }
    

}