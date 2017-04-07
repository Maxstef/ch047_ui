import {Component} from '@angular/core';
import {Tariff} from "../model/tariff";
import {CalculatorResult} from "../model/calculator-result";
import {PaymentService} from "../services/payment.service";
import {AuthService} from "../services/auth.service";
import {CalculateService} from '../services/calculate.service';

@Component({
  selector: "ms-calculate",
  templateUrl: "app/calculate/calculate.component.html"
})

export class CalculateComponent {
  curTariff: Tariff = {
    tariffs: [],
    changePointUnit: '',
    valueUnit: ''
  }
  curValue: number;
  lastValue: number = 0;
  prevValue: number;
  prevMonthValue: number;
  calculatorResult: CalculatorResult = {error: false, errorMessage: '', totCount: 0, totSum: 0, arrSum: <any>[]};

  constructor(private paymentService: PaymentService, private calculateService: CalculateService, private auth: AuthService) {
  }

  ngOnInit() {
    this.paymentService.getPaymentsByUserId(this.auth.userId)
        .subscribe(
            payments => {
              this.prevMonthValue = payments[payments.length - 2].counterValue;
              this.prevValue = payments[payments.length - 2].counterValue;
              this.lastValue = payments[payments.length - 1].counterValue;
            },
            err => {
              console.log(err)
            }
        );
  }

  setTariff(tariff: Tariff) {
    this.curTariff = tariff;
  }

  setCurValue(value: string, setLastValue: boolean) {
    setLastValue ? this.curValue = this.lastValue : this.curValue = parseInt(value);
  }

  setPrevValue(value: string, setPrevMonthValue: boolean) {
    setPrevMonthValue ? this.prevValue = this.prevMonthValue : this.prevValue = parseInt(value);
  }

  showCalculatorOutput() {
    if ((this.curValue || this.curValue == 0) && (this.prevValue || this.prevValue == 0)) {
      this.calculatorResult = this.calculateService.calculateSumToPay(this.curValue, this.prevValue, this.curTariff);
      return true;
    }
    return false;
  }
}