import {Component} from '@angular/core';
import {PaymentService} from '../services/payment.service';
import {Payment} from '../model/payment';
import {Tariff} from '../model/tariff';
import {CalculateService} from '../services/calculate.service';
import {DateService} from '../services/date.service';
import {AuthService} from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';




@Component({
    selector: "ms-set-counter-value",
    templateUrl: "app/set-counter-value/set-counter-value.component.html",
    styleUrls: ['app/set-counter-value/set-counter-value.component.css'],
    providers: [FormBuilder]
})

export class SetCounterValueComponent {
    lastPayment: Payment = {id: 0, month: 0, year: 0,counterValue: 0,prevCounterValue: 0,sumToPay: 0,payed: false, dateOfpayment: '',dateOfInput: '', userId: 0};
    curTariff: Tariff;
    dateToRenew: any;
    inputBegin: false;
    valueAddForm: FormGroup;
    lastMonthPayment: Payment;
    periodToRenew: string;
    feedback: string = null;
    constructor(
        private paymentService: PaymentService,
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private calculateService: CalculateService,
        private dateService: DateService){
            
    }
    ngOnInit(){
        this.paymentService.getTariff()
        .subscribe(
            tariff => { this.curTariff = tariff;},
            err => {console.log(err)}
        );
        this.paymentService.getPaymentsByUserId(this.auth.userId)    
        .subscribe(
            payments => { 
                 this.lastPayment = payments[payments.length - 1]; this.buildForm();
                },
            err => {console.log(err)}
        ); 
        this.valueAddForm = this.formBuilder.group({'counterValue': ['', [ ]],'date': ['', []]});//do it to avoid error
        this.dateToRenew = this.dateService.getDateToRenew();
        this.periodToRenew = this.dateService.getPeriodToRenew();
    }
    
    buildForm(){
        this.inputBegin = false;
        let lastValue = this.lastPayment.counterValue;
        let today = this.dateService.displayDate(this.dateService.getTodayDate());
        this.valueAddForm = this.formBuilder.group({
        'counterValue': ['', [
            Validators.required,
            isNumber,
            moreThanLast
            ]
        ],
        'date': [this.dateService.displayDate(this.dateService.getTodayDate()), [
            Validators.required,
            todayDate
        ]]
        }); 
        function moreThanLast(c: FormControl): any{
            let result: any;
            (parseInt(c.value) >= lastValue)? result = null: result = {lessThanLast: true};
            return result;
        }
        function todayDate(c: FormControl): any{
            let result: any;
            (c.value == today)?result = null : result = {notTodayDate: true}
            return result;
        }
        function isNumber(c: FormControl): any{
            let result: any;
            let reg = new RegExp('^\\d+$');
            (reg.test(c.value))? result = null: result = {notNumber: true};
            return result;
        }
    }
    valueErrors = {
        required: 'Поле обовязкове для заповнення',
        notNumber: 'Значення повинно бути числове',
        lessThanLast: 'Значення не може бути менше ніж попереднє'
    }
    displayValueErrors(obj: any){
        let txt = '';
        for(var error in obj) {
            txt += this.valueErrors[error];
            break;
        }
        return txt;
    }
    onSubmit(){
        
    }
    addPayment(value: any){
        if(this.periodToRenew == this.dateService.getPeriod(this.lastPayment.month, this.lastPayment.year)){
            let payment: Payment = {
                id: this.lastPayment.id,
                month: this.lastPayment.month,
                year: this.lastPayment.year,
                counterValue: parseInt(value),
                prevCounterValue: this.lastPayment.prevCounterValue,
                sumToPay: this.calculateService.roundTwoDecimal(this.calculateService.calculateSumToPay(value, this.lastPayment.prevCounterValue, this.curTariff).totSum),
                payed: false,
                dateOfpayment: '',
                dateOfInput: this.dateService.getTodayDate(),
                userId: parseInt(this.auth.userId)
            };
            this.paymentService.editPayment(payment)
                    .subscribe(
                        payment => { this.successFunction(payment);
                        },
                        err => {console.log(err)}
                    );
        } else {
            let payment: Payment = {
                //id: this.lastId + 1,
                month: this.dateService.getMonth(this.dateToRenew),
                year: this.dateService.getYear(this.dateToRenew),
                counterValue: parseInt(value),
                prevCounterValue: this.lastPayment.counterValue,
                sumToPay: this.calculateService.roundTwoDecimal(this.calculateService.calculateSumToPay(value, this.lastPayment.counterValue, this.curTariff).totSum),
                payed: false,
                dateOfpayment: '',
                dateOfInput: this.dateService.getTodayDate(),
                userId: parseInt(this.auth.userId)
            };
            this.paymentService.addPayment(payment)
                    .subscribe(
                        payment => { this.successFunction(payment);
                        },
                        err => {console.log(err)}
                    );
        }
    }
    successFunction(payment: Payment){
        this.lastPayment = payment;
        this.feedback = 'Показник за ' + this.periodToRenew + ' внесено - '+ this.lastPayment.counterValue;
        this.buildForm();
    }
}