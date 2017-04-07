import {Component, OnInit, ViewChild} from '@angular/core';
import {Tariff} from '../model/tariff';
import {PaymentService} from '../services/payment.service';
import {TariffComponent} from '../tariff/tariff.component';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";

@Component({
    selector: "ms-change-tariff",
    templateUrl: "app/change-tariff/change-tariff.component.html"
})

export class ChangeTariffComponent implements OnInit {
    @ViewChild(TariffComponent) tariffComponent: TariffComponent
    newTariffForm: FormGroup;
    newTariff: Tariff = {
        changePointUnit: 'кВ',
        valueUnit: 'грн',
        tariffs: []
    }
    lastRange: boolean = false;
    constructor( private  formBuilder: FormBuilder, private paymentService: PaymentService){}
    ngOnInit() {
        this.initFrom();
    }
    initFrom(){
        this.newTariffForm = this.formBuilder.group({
            'tariffs': this.formBuilder.array([])
        });
        (<FormArray>this.newTariffForm.controls['tariffs']).push(this.initTariffRange(0));
    }
    addTariffRange(){
        if(this.newTariffForm.status == 'INVALID'){
            return false;
        }
        let length = (<FormArray>this.newTariffForm.controls['tariffs']).length;
        if(length > 4){
            return false;
        }
        let value = parseInt((<FormArray>this.newTariffForm.controls['tariffs']).value[length - 1].to) + 1;
        (<FormArray>this.newTariffForm.controls['tariffs']).push(this.initTariffRange(value));
        this.lastRange = false;
    }
    deleteTariffRange(){
        (<FormArray>this.newTariffForm.controls['tariffs']).removeAt((<FormArray>this.newTariffForm.controls['tariffs']).length-1);
        this.lastRange = false;
    }
    initTariffRange(from: number){
        return this.formBuilder.group({
        from: [from, [Validators.required, this.isNumber]],
        to: ['', [Validators.required, this.isNumber, 
        (c: FormControl): any => {let res: any;(c.value > from)?res = null:res = {lessThanFrom: true};return res;}//check if to more than from
        ]],
        value: ['', [Validators.required, this.isPrice]]
        });
    }
    addTariff(array: any[]){
        for(let i = 0; i < array.length; i++){
            let to: number = parseInt(array[i].controls.to.value);
            (isNaN(to))?to = null: to = to;
            this.newTariff.tariffs.push({from: parseInt(array[i].controls.from.value), to: to, value: parseFloat(array[i].controls.value.value)});
        }
        this.paymentService.newTariff(this.newTariff)
        .subscribe(
            tariff => { this.tariffComponent.setNewTariff(tariff);
                this.initFrom();
                this.lastRange = false;
                this.newTariff.tariffs = [];
                },
            err => {console.log(err);}
        );
    }
    validChange(){
        this.lastRange = !this.lastRange;
        let length = (<FormArray>this.newTariffForm.controls['tariffs']).controls.length;
        if(this.lastRange){
            this.newTariffForm['controls']['tariffs']['controls'][length - 1]['controls']['to'].setValue('');
            this.newTariffForm['controls']['tariffs']['controls'][length - 1]['controls']['to'].setValidators();
            this.newTariffForm['controls']['tariffs']['controls'][length - 1]['controls']['to'].updateValueAndValidity();
        } else {
            let from = this.newTariffForm['controls']['tariffs']['controls'][length - 1]['controls']['from'].value;
            this.newTariffForm['controls']['tariffs']['controls'][length - 1]['controls']['to'].setValidators([Validators.required, this.isNumber, 
            (c: FormControl): any => {let res: any;(c.value > from)?res = null:res = {lessThanFrom: true};return res;}//check if to more than from
            ]);
            this.newTariffForm['controls']['tariffs']['controls'][length - 1]['controls']['to'].updateValueAndValidity();
        }
        (<FormArray>this.newTariffForm.controls['tariffs']).controls[length - 1].updateValueAndValidity();
    }
    isNumber(c: FormControl): any{
            let result: any;
            let reg = new RegExp('^\\d+$');
            (reg.test(c.value))? result = null: result = {notNumber: true};
            return result;
    }
    isPrice(c: FormControl): any{
            let result: any;
            let reg1 = new RegExp('^[0-9.]+$');
            let reg2 = new RegExp('.*[0-9].*');
            (reg1.test(c.value) && reg2.test(c.value))? result = null: result = {notNumber: true};
            return result;
    }
}