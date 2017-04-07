import {Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import{Router} from '@angular/router';


@Component({
    selector: "ms-login",
    templateUrl: "app/login/login.component.html"
})

export class LoginComponent implements  OnInit{
    loginError: string;
    constructor(private auth: AuthService, private router: Router){}
    ngOnInit(){
        if(this.auth.isLoggedIn()){
            if(this.auth.role == 'admin'){
                this.router.navigate(['/change-tariff']);
            } else if(this.auth.role == 'customer') {
                this.router.navigate(['/set-value']);
            }
        }
    }
    checkUser(username: string, password: string){
        this.auth.getUsers()
        .subscribe(
                (users) => {
                    for(let i = 0; i < users.length; i++){
                        if(users[i].username == username && users[i].password == password){
                            this.auth.loggedIn = true;
                            this.auth.activeUser = users[i].username;
                            this.auth.role = users[i].role;
                            this.auth.userId = users[i].id;
                            break;
                        }        
                    }
                    if(!this.auth.loggedIn){
                        this.loginError = 'Очень жаль';
                        return;
                    } else if(this.auth.role == 'admin'){
                        this.loginError = null ;
                        this.router.navigate(['./change-tariff']);
                        localStorage.setItem('role', 'admin');
                        localStorage.setItem('username', this.auth.activeUser);
                        localStorage.setItem('id', this.auth.userId);
                    } else if(this.auth.role == 'customer') {
                        this.loginError = null ;
                        this.router.navigate(['./set-value']);
                        localStorage.setItem('role', 'customer');
                        localStorage.setItem('username', this.auth.activeUser);
                        localStorage.setItem('id', this.auth.userId);
                    }    
                },
                (err) => {console.log(err)}
            )
    }
    
}