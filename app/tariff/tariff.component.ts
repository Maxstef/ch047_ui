import {Component, Output, EventEmitter, OnInit } from '@angular/core';
import {Tariff} from "../model/tariff";
import {PaymentService} from "../services/payment.service";

@Component({
    selector: "ms-tariff",
    templateUrl: "app/tariff/tariff.component.html",
    styleUrls: ['app/tariff/tariff.component.css']
})

export class TariffComponent implements  OnInit{
    @Output() setTariff: EventEmitter<Tariff> = new EventEmitter<Tariff>();
    curTariff: Tariff = {
        tariffs: [],
        changePointUnit: '',
        valueUnit: ''
    } 
    constructor(private paymentService: PaymentService){}
    ngOnInit(){
        this.paymentService.getTariff()
        .subscribe(
            tariff => { this.curTariff = tariff;
                         this.setTariff.emit(tariff);    
            },
            err => {console.log(err)}
        );   
    } 
    
    setNewTariff(tariff: Tariff){
        this.curTariff = tariff;
    }
}