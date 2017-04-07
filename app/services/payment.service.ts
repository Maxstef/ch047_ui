import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import {Payment} from '../model/payment';
import {Tariff} from '../model/tariff';
import {DateService} from '../services/date.service';
import 'rxjs/Rx';
import {config} from "../config";

@Injectable()
export class PaymentService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private paymentsUrl = config.url + "/payments";
    private tariffUrl = config.url + "/tariff";
    constructor(private http: Http, private dateService: DateService) { }


    getAllPayments(){
        return this.http.get(this.paymentsUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getPaymentsByUserId(id: any){
        return this.http.get(this.paymentsUrl + '?userId=' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getTariff(){
        return this.http.get(this.tariffUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    newTariff(tariff: Tariff){
        const url = this.tariffUrl;
        let options = new RequestOptions({headers: this.headers}); 
        return this.http.put(url, tariff, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    editPayment(payment: Payment){
        const url = this.paymentsUrl;
        let options = new RequestOptions({headers: this.headers}); 
        return this.http.put(url + '/' + payment.id, payment, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    addPayment(payment: Payment){
        const url = this.paymentsUrl;
        let options = new RequestOptions({headers: this.headers}); 
        return this.http.post(url, payment, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}