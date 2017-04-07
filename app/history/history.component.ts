import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../services/payment.service';
import {DateService} from '../services/date.service';
import {AuthService} from '../services/auth.service';
import {Payment} from '../model/payment';
import * as lodash from 'lodash';



@Component({
    selector: "ms-history",
    templateUrl: "app/history/history.component.html"
})

export class HistoryComponent implements OnInit {
    payments: Payment[] = [];
    paymentDetail: Payment = {
        id: 0,
        month: 0,
        year: 0,
        counterValue: 0,
        prevCounterValue: 0,
        sumToPay: 0,
        payed: false,
        dateOfpayment: '',
        dateOfInput: '',
        userId: 0
    };
    paymentDetailsShow: boolean = false;
    sortOrder: string = 'desc';
    sortBy: string = 'dateOfInput';
    constructor(private paymentService: PaymentService,
     private dateService: DateService,
     private auth: AuthService){
    }
    ngOnInit(){
        this.paymentService.getPaymentsByUserId(this.auth.userId)
        .subscribe(
            payments => {
                this.payments = payments;
                        this.payments = lodash.orderBy(this.payments, this.sortBy, this.sortOrder);
            },
            err => {console.log(err)}
        );
        
    }
    showPaymentDetails(id: any){
        this.paymentDetailsShow = true;
        for(let i = 0; i < this.payments.length; i++){
            if(this.payments[i].id == id){
                this.paymentDetail = this.payments[i];
            }
        }
    }
    
    markAsPayed(id: any){
            let payment: Payment;
            for(let i = 0; i < this.payments.length; i++){
                if(this.payments[i].id == id){
                    payment = this.payments[i];
                }
            }
            payment.dateOfpayment = this.dateService.getTodayDate();
            payment.payed = true; 
            this.paymentService.editPayment(payment)
            .subscribe(
                payment => { this.paymentDetail = payment; },
                err => {console.log(err)}
            );
    }
    sort(changeOrder: boolean){
        if(changeOrder){
            (this.sortOrder == 'asc')?this.sortOrder = 'desc': this.sortOrder = 'asc';
        }
        if(this.sortBy == 'totalValue'){
            this.payments = lodash.orderBy(this.payments, [function(o) { return o.counterValue - o.prevCounterValue; }], this.sortOrder);
        }
        this.payments = lodash.orderBy(this.payments, this.sortBy, this.sortOrder);
    }
}