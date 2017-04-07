import {Injectable} from '@angular/core';
import {Payment} from '../model/payment';
import {Tariff} from '../model/tariff';
import {CalculatorResult} from '../model/calculator-result';

@Injectable()

export class CalculateService {
    calculateSumToPay(curValue: number, prevValue: number, curTariff: Tariff): CalculatorResult{
        let result: CalculatorResult;
            if(isNaN(curValue) || isNaN(prevValue) || curValue < 0 || prevValue < 0 || (curValue%1) !== 0 || (prevValue%1) !== 0){
                result = {error: true, errorMessage: 'Допустимі лише числові цілі невід\'ємні значення', totCount: null, totSum: null, arrSum: null };
                return result;
            }
            if(curValue > prevValue){
                result = {error: false, errorMessage: '', totCount: curValue - prevValue, totSum: 0, arrSum: []};
                let diff: number;
                let totCount = curValue - prevValue;
                let tariffFrom: number;
                let tariffTo: number;
                let tariffValue: number;
                for(let i = 0; i < curTariff.tariffs.length; i++){
                    tariffFrom = curTariff.tariffs[i].from - 1;
                    (tariffFrom < 0)?tariffFrom = 0: tariffFrom = tariffFrom;
                    tariffTo = curTariff.tariffs[i].to;
                    tariffValue = curTariff.tariffs[i].value;
                    if(tariffTo === null && totCount > tariffFrom){
                        diff = totCount - tariffFrom;
                        result.arrSum.push({kW: diff, priceForkW: tariffValue, total: diff * tariffValue});
                        result.totSum += diff * tariffValue;
                    } else if (totCount > tariffTo && tariffTo !== null) {
                        diff = tariffTo - tariffFrom;
                        result.arrSum.push({kW: diff, priceForkW: tariffValue, total: diff * tariffValue});
                        result.totSum += diff * tariffValue;
                    } else if (totCount <= tariffTo && totCount > tariffFrom && tariffTo !== null) {
                        diff = totCount - tariffFrom;
                        result.arrSum.push({kW: diff, priceForkW: tariffValue, total: diff * tariffValue});
                        result.totSum += diff * tariffValue;                    
                   }
                }
                return result;
            } else {
                result = {error: true, errorMessage: 'Попередні покази повинні бути менші за теперішні', totCount: null, totSum: null, arrSum: null };
                return result;
            }  
    }
    coinsIntoPaper(coins: any){
        return parseFloat(coins) / 100;
    }
    roundTwoDecimal(number: number){
        return parseFloat(number.toFixed(2));
    }
}